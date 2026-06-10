type Props = {
  className?: string;
};

const StatsBorderIcon = ({ className }: Props) => (
  <svg className={className} aria-hidden="true">
    <rect
      x="1"
      y="1"
      width="calc(100% - 2px)"
      height="calc(100% - 2px)"
      rx="29"
      ry="29"
      fill="none"
      stroke="#F4C550"
      strokeWidth="1.5"
      strokeDasharray="15 18"
    />
  </svg>
);

export default StatsBorderIcon;
