import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { neonColors } from '../theme/theme';

export interface StarRatingProps {
  value: number; // 0..5
  onChange?: (next: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

const SIZE_TO_PX: Record<NonNullable<StarRatingProps['size']>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 'md',
  className = '',
  showValue = false,
}) => {
  const [hover, setHover] = React.useState<number | null>(null);
  const effective = hover ?? value;
  const px = SIZE_TO_PX[size];
  const interactive = !readonly && Boolean(onChange);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        className={`inline-flex items-center gap-1 ${interactive ? 'cursor-pointer' : ''}`}
        role={interactive ? 'radiogroup' : undefined}
        aria-label="Rating"
      >
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const filled = effective >= starValue;
          return (
            <motion.button
              key={starValue}
              type="button"
              className="p-0.5"
              disabled={!interactive}
              onMouseEnter={() => interactive && setHover(starValue)}
              onMouseLeave={() => interactive && setHover(null)}
              onFocus={() => interactive && setHover(starValue)}
              onBlur={() => interactive && setHover(null)}
              onClick={() => interactive && onChange?.(starValue)}
              whileHover={interactive ? { scale: 1.12, y: -1 } : undefined}
              whileTap={interactive ? { scale: 0.98 } : undefined}
              aria-label={`${starValue} star`}
              aria-checked={interactive ? value === starValue : undefined}
              role={interactive ? 'radio' : undefined}
              style={{ background: 'transparent' }}
            >
              <Icon
                icon={filled ? 'lucide:star' : 'lucide:star'}
                width={px}
                height={px}
                style={{
                  color: filled ? neonColors.lightYellow : '#4b5563',
                  filter: filled ? `drop-shadow(0 0 10px ${neonColors.neonGreen}55)` : 'none',
                }}
              />
            </motion.button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs text-gray-300">
          {value.toFixed(1)}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;

