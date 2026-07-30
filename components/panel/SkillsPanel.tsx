import { motion } from 'framer-motion';
import { portfolio } from '@/config/portfolio-data';
import { useState } from 'react';
import PanelHeading from './PanelHeading';

interface Skill {
  name: string;
  category: string;
  description: string;
  color: string;
}

const SkillsPanel = () => {
  const [selected, setSelected] = useState<Skill>(portfolio.skills[0]);

  return (
    <>
      <PanelHeading
        index={2}
        title='목적을 향해 움직이는 기술.'
        description='행성을 선택해 각 기술을 실제 제품에서 어떻게 사용하는지 확인해 보세요.'
      />
      <div className='mt-8 grid grid-cols-3 gap-2 sm:grid-cols-2'>
        {portfolio.skills.map((skill) => (
          <button
            key={skill.name}
            type='button'
            onClick={() => setSelected(skill)}
            className={`rounded-[18px] border p-4 text-left transition-colors ${
              selected.name === skill.name
                ? 'border-accent/60 bg-accent/10'
                : 'border-border-subtle bg-white/[0.025] hover:border-white/25'
            }`}
          >
            <span
              className='mb-4 block h-5 w-5 rounded-full shadow-[0_0_18px_currentColor]'
              style={{ backgroundColor: skill.color, color: skill.color }}
            />
            <span className='text-[14px] font-semibold text-foreground'>{skill.name}</span>
          </button>
        ))}
      </div>
      <motion.article
        key={selected.name}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className='mt-3 rounded-[18px] border border-accent/25 bg-accent/[0.06] p-5'
      >
        <p className='text-[11px] uppercase tracking-[0.18em] text-accent-soft'>{selected.category}</p>
        <p className='mt-2 text-[14px] leading-6 text-muted'>{selected.description}</p>
      </motion.article>
    </>
  );
};

export default SkillsPanel;
