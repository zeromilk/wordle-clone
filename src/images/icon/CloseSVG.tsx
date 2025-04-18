interface Props {
  width?: number;
  height?: number;
}

const CloseSVG: React.FC<Props> = ({ width = 20, height = 20 }) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      width={height}
      viewBox="0 0 24 24"
      data-testid="icon-close"
    >
      <path
        fill="var(--color-tone-1)"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      ></path>
    </svg>
  );
};

export default CloseSVG;
