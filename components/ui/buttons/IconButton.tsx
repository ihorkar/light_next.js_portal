
export interface IconButtonProps {
  icon: JSX.Element; 
  onClick: (item?: any) => void;
  label: string;
  type?: 'default' | 'critical' | 'warning' | 'success' | 'highlight';
  visible: (item?: any) => boolean; 
  item?: any; 
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  label,
  type = 'default',
  visible,
  item
}) => {
  if (!visible(item)) {
      return null;
  }

  let classNames = "p-2 mr-2 hover:text-iconhovered";

  switch (type) {
      case 'default':
          classNames += "text-icondefault";
          break;
      case 'critical':
          classNames += " text-iconcritical";
          break;
      case 'warning':
          classNames += " text-iconwarning";
          break;
      case 'success':
          classNames += " text-iconsuccess";
          break;
      case 'highlight':
        classNames += " text-iconhighlight";
        break;
  }

  return (
      <button onClick={() => onClick(item)} aria-label={label} className={classNames}>
          {icon}
      </button>
  );
};

export default IconButton;
