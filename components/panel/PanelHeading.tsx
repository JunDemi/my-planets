import { destinations } from '@/config/portfolio-data';

interface PanelHeadingProps {
  index: number;
  title: string;
  description: string;
}

const PanelHeading = ({ index, title, description }: PanelHeadingProps) => {
  return (
    <div>
      <p className='text-14m uppercase text-accent-soft'>
        {String(index + 1).padStart(2, '0')} · {destinations[index].label}
      </p>
      <h2 className='mt-4 text-40sb text-foreground'>{title}</h2>
      <p className='mt-4 max-w-xl text-16r text-muted'>{description}</p>
    </div>
  );
};

export default PanelHeading;
