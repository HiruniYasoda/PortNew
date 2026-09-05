import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Sparkles, Plus, Trash2, Sliders, Layers, Percent, Eye } from 'lucide-react';

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface SkillCategoryData {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface SkillTabGroup {
  id: string;
  tabName: string;
  description: string;
  displayStyle?: 'bar' | 'circular';
  categories: SkillCategoryData[];
}

export interface SkillsSectionData {
  headerTitle: string;
  headerSubtitle: string;
  tabs?: SkillTabGroup[];
  // Legacy fields for backward compatibility
  toggleCategories?: string[];
  technicalDescription?: string;
  technicalCategories?: SkillCategoryData[];
  softDescription?: string;
  softSkills?: { id: string; label: string; level: number }[];
}

interface SkillsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SkillsSectionData;
  onSave: (updatedData: SkillsSectionData) => void;
}

export const SkillsEditModal: React.FC<SkillsEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  // Convert legacy format to unified tabs if needed
  const getInitialTabs = (): SkillTabGroup[] => {
    if (initialData.tabs && initialData.tabs.length > 0) {
      return initialData.tabs;
    }

    const legacyTabs: SkillTabGroup[] = [];

    // Technical Tab
    legacyTabs.push({
      id: 'tab-tech',
      tabName: 'Technical',
      description:
        initialData.technicalDescription ||
        'Expertise in modern web technologies, from frontend interfaces to robust backend architecture and data management.',
      displayStyle: 'bar',
      categories: initialData.technicalCategories || [
        {
          id: 'cat-1',
          title: 'Frontend',
          skills: [
            { id: 'sk-1', name: 'React / Next.js', level: 90 },
            { id: 'sk-2', name: 'TypeScript', level: 85 },
          ],
        },
      ],
    });

    // Soft Skills Tab
    const softSkillsAsCategories: SkillCategoryData[] = [
      {
        id: 'cat-soft',
        title: 'Interpersonal & Leadership',
        skills: (initialData.softSkills || []).map((s) => ({
          id: s.id,
          name: s.label,
          level: s.level,
        })),
      },
    ];

    legacyTabs.push({
      id: 'tab-soft',
      tabName: 'Soft Skills',
      description:
        initialData.softDescription ||
        'Essential abilities that drive successful collaboration, leadership, and efficient project delivery.',
      displayStyle: 'circular',
      categories: softSkillsAsCategories,
    });

    return legacyTabs;
  };

  const [headerTitle, setHeaderTitle] = useState(initialData.headerTitle || 'My Skills');
  const [headerSubtitle, setHeaderSubtitle] = useState(
    initialData.headerSubtitle ||
      'A showcase of my technical proficiency and professional attributes driven by a passion for continuous learning.'
  );
  const [tabs, setTabs] = useState<SkillTabGroup[]>(getInitialTabs());
  const [selectedTabId, setSelectedTabId] = useState<string>(
    getInitialTabs()[0]?.id || 'tab-tech'
  );

  if (!isOpen) return null;

  const currentTab = tabs.find((t) => t.id === selectedTabId) || tabs[0];

  // Tab Helpers
  const addTabGroup = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: SkillTabGroup = {
      id: newTabId,
      tabName: 'Functional Skills',
      description: 'Core functional capabilities, project methodologies, and domain knowledge.',
      displayStyle: 'bar',
      categories: [
        {
          id: `cat-${Date.now()}`,
          title: 'Core Domain Capabilities',
          skills: [
            { id: `sk-1-${Date.now()}`, name: 'Agile & Scrum Methodologies', level: 85 },
            { id: `sk-2-${Date.now()}`, name: 'System Architecture & Design', level: 80 },
          ],
        },
      ],
    };
    setTabs([...tabs, newTab]);
    setSelectedTabId(newTabId);
  };

  const removeTabGroup = (tabId: string) => {
    if (tabs.length <= 1) {
      alert('You must have at least one toggle tab.');
      return;
    }
    const updated = tabs.filter((t) => t.id !== tabId);
    setTabs(updated);
    if (selectedTabId === tabId) {
      setSelectedTabId(updated[0].id);
    }
  };

  const updateTabInfo = (tabId: string, key: 'tabName' | 'description' | 'displayStyle', val: string) => {
    setTabs(
      tabs.map((t) => (t.id === tabId ? { ...t, [key]: val } : t))
    );
  };

  // Skill Section (Category) Helpers within current tab
  const addCategoryToCurrentTab = () => {
    if (!currentTab) return;
    const newCat: SkillCategoryData = {
      id: `cat-${Date.now()}`,
      title: 'New Skill Section',
      skills: [
        { id: `sk-1-${Date.now()}`, name: 'New Skill 1', level: 80 },
        { id: `sk-2-${Date.now()}`, name: 'New Skill 2', level: 75 },
      ],
    };
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id ? { ...t, categories: [...t.categories, newCat] } : t
      )
    );
  };

  const removeCategoryFromCurrentTab = (catId: string) => {
    if (!currentTab) return;
    if (currentTab.categories.length <= 1) {
      alert('A tab must have at least one skill section.');
      return;
    }
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id
          ? { ...t, categories: t.categories.filter((c) => c.id !== catId) }
          : t
      )
    );
  };

  const updateCategoryTitleInTab = (catId: string, newTitle: string) => {
    if (!currentTab) return;
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id
          ? {
              ...t,
              categories: t.categories.map((c) => (c.id === catId ? { ...c, title: newTitle } : c)),
            }
          : t
      )
    );
  };

  // Skill Helpers within Category
  const addSkillToCategory = (catId: string) => {
    if (!currentTab) return;
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id
          ? {
              ...t,
              categories: t.categories.map((c) => {
                if (c.id === catId) {
                  return {
                    ...c,
                    skills: [
                      ...c.skills,
                      { id: `sk-${Date.now()}`, name: 'New Skill Name', level: 80 },
                    ],
                  };
                }
                return c;
              }),
            }
          : t
      )
    );
  };

  const removeSkillFromCategory = (catId: string, skillId: string) => {
    if (!currentTab) return;
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id
          ? {
              ...t,
              categories: t.categories.map((c) => {
                if (c.id === catId) {
                  if (c.skills.length <= 1) {
                    alert('A section must have at least one skill.');
                    return c;
                  }
                  return { ...c, skills: c.skills.filter((s) => s.id !== skillId) };
                }
                return c;
              }),
            }
          : t
      )
    );
  };

  const updateSkill = (
    catId: string,
    skillId: string,
    key: 'name' | 'level',
    val: string | number
  ) => {
    if (!currentTab) return;
    setTabs(
      tabs.map((t) =>
        t.id === currentTab.id
          ? {
              ...t,
              categories: t.categories.map((c) => {
                if (c.id === catId) {
                  return {
                    ...c,
                    skills: c.skills.map((s) => (s.id === skillId ? { ...s, [key]: val } : s)),
                  };
                }
                return c;
              }),
            }
          : t
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      headerTitle,
      headerSubtitle,
      tabs,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0b0a10] border border-purple-500/50 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6 border-b border-purple-500/25 pb-4">
            <div className="p-3 bg-purple-600/30 rounded-2xl text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-500/40">
              <Sliders size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Edit Skills & Add New Toggle Tabs</h3>
              <p className="text-xs text-purple-300/80 font-light">Add new toggle tabs (e.g. Functional Skills), add skill sections & set percentage levels.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
            {/* 1. SECTION HEADER TITLES */}
            <div className="bg-purple-950/20 p-4 rounded-2xl border border-purple-500/30 flex flex-col gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-purple-300">Overall Section Title & Subtitle</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  placeholder="e.g. My Skills"
                  className="bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                />
                <input
                  type="text"
                  required
                  value={headerSubtitle}
                  onChange={(e) => setHeaderSubtitle(e.target.value)}
                  placeholder="Subtitle description..."
                  className="bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                />
              </div>
            </div>

            {/* 2. TOGGLE TABS HEADER BAR WITH + ADD NEW TAB BUTTON */}
            <div className="flex items-center justify-between border-b border-purple-500/25 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Toggle Tabs ({tabs.length})
              </span>
              <button
                type="button"
                onClick={addTabGroup}
                className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                <Plus size={15} /> Add Entire New Toggle Tab
              </button>
            </div>

            {/* TAB SELECTOR STRIP */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const isSelected = tab.id === selectedTabId;
                return (
                  <div key={tab.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedTabId(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span>{tab.tabName}</span>
                    </button>
                    {tabs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTabGroup(tab.id)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title={`Delete Tab "${tab.tabName}"`}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3. SELECTED TAB EDITOR PANEL */}
            {currentTab && (
              <div className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-2xl flex flex-col gap-5">
                {/* Tab Info: Name, Description, Display Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-purple-500/20 pb-4">
                  <div>
                    <label className="text-[11px] font-bold text-purple-300 block mb-1">Tab Name</label>
                    <input
                      type="text"
                      required
                      value={currentTab.tabName}
                      onChange={(e) => updateTabInfo(currentTab.id, 'tabName', e.target.value)}
                      placeholder="e.g. Functional Skills"
                      className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-purple-300 block mb-1">Tab Subtitle / Description</label>
                    <input
                      type="text"
                      required
                      value={currentTab.description}
                      onChange={(e) => updateTabInfo(currentTab.id, 'description', e.target.value)}
                      placeholder="Tab description..."
                      className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-purple-300 block mb-1 flex items-center gap-1">
                      <Eye size={12} /> Display Layout Style
                    </label>
                    <select
                      value={currentTab.displayStyle || 'bar'}
                      onChange={(e) => updateTabInfo(currentTab.id, 'displayStyle', e.target.value as 'bar' | 'circular')}
                      className="w-full bg-black/60 border border-purple-500/40 rounded-xl py-2 px-3 text-white text-xs cursor-pointer"
                    >
                      <option value="bar">Progress Bars Grid</option>
                      <option value="circular">Circular Percentage Badges</option>
                    </select>
                  </div>
                </div>

                {/* Skill Sections under this Tab */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                    <Layers size={16} /> Skill Sections under "{currentTab.tabName}" ({currentTab.categories.length})
                  </span>
                  <button
                    type="button"
                    onClick={addCategoryToCurrentTab}
                    className="px-3.5 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  >
                    <Plus size={14} /> Add Skill Section
                  </button>
                </div>

                {/* Category List */}
                <div className="flex flex-col gap-5">
                  {currentTab.categories.map((cat) => (
                    <div key={cat.id} className="p-4 bg-black/50 border border-purple-500/30 rounded-xl flex flex-col gap-4">
                      {/* Section Title & Buttons */}
                      <div className="flex items-center justify-between gap-3">
                        <input
                          type="text"
                          required
                          value={cat.title}
                          onChange={(e) => updateCategoryTitleInTab(cat.id, e.target.value)}
                          placeholder="Section Title (e.g. Agile PM / Infrastructure)"
                          className="flex-1 max-w-sm bg-white/5 border border-purple-500/30 rounded-lg py-1.5 px-3 text-white text-xs font-bold"
                        />

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addSkillToCategory(cat.id)}
                            className="px-3 py-1 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1"
                          >
                            <Plus size={13} /> Add Skill
                          </button>
                          {currentTab.categories.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCategoryFromCurrentTab(cat.id)}
                              className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all text-xs font-bold flex items-center gap-1"
                              title="Delete Section"
                            >
                              <Trash2 size={13} /> Delete Section
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Skill Items */}
                      <div className="flex flex-col gap-2.5">
                        {cat.skills.map((sk) => (
                          <div key={sk.id} className="p-2.5 bg-white/5 border border-purple-500/20 rounded-lg flex items-center gap-3">
                            <input
                              type="text"
                              required
                              value={sk.name}
                              onChange={(e) => updateSkill(cat.id, sk.id, 'name', e.target.value)}
                              placeholder="Skill Name (e.g. Project Management)"
                              className="flex-1 bg-black/40 border border-purple-500/30 rounded-md py-1.5 px-3 text-white text-xs"
                            />

                            <div className="flex items-center gap-2 w-44">
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={sk.level}
                                onChange={(e) => updateSkill(cat.id, sk.id, 'level', parseInt(e.target.value) || 0)}
                                className="w-full accent-purple-500 cursor-pointer"
                              />
                              <div className="flex items-center gap-0.5 bg-purple-950/80 border border-purple-500/40 rounded-lg px-2 py-0.5 text-purple-300 font-bold text-xs w-14 justify-center">
                                <span>{sk.level}</span>
                                <Percent size={10} />
                              </div>
                            </div>

                            {cat.skills.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeSkillFromCategory(cat.id, sk.id)}
                                className="p-1 text-red-400 hover:text-red-300 rounded-md transition-all"
                                title="Remove Skill"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20 mt-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all flex items-center gap-2"
              >
                <Save size={16} /> Save Skills Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
