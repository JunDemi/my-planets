import { destinations } from '@/config/portfolio-data';

interface PlanetNavigationProps {
  activeIndex: number | null;
  onSelect: (index: number) => void;
}

const PlanetNavigation = ({ activeIndex, onSelect }: PlanetNavigationProps) => {
  return (
    <nav
      aria-label='Planet destinations'
      className='pointer-events-auto fixed bottom-5 left-1/2 z-50 max-w-[calc(100vw-32px)] -translate-x-1/2 overflow-x-auto rounded-full border border-border-subtle bg-surface-scene/80 p-2 backdrop-blur-xl scrollbar-hide'
    >
      <ul className='flex min-w-max items-center gap-1'>
        {destinations.map((destination, index) => (
          <li key={destination.id} className='border-none outline-none'>
            <button
              type='button'
              onClick={() => onSelect(index)}
              aria-current={activeIndex === index ? 'page' : undefined}
              className={`font-mediumtransition-colors flex items-center gap-2 !outline-none rounded-full px-3 py-2 text-[11px] ${
                activeIndex === index
                  ? 'bg-white/10 text-foreground'
                  : 'text-muted hover:bg-white/[0.05] hover:text-foreground'
              }`}
            >
              <span
                className='h-2.5 w-2.5 rounded-full shadow-[0_0_10px_currentColor]'
                style={{ backgroundColor: destination.color, color: destination.color }}
              />
              <span>{destination.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PlanetNavigation;
