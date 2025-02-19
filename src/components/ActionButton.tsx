// ActionButton.tsx
import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  additionalClasses?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, icon, disabled = false, additionalClasses = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-10 px-[18px] py-2.5 bg-white rounded-[47px] border border-[#f6e2c4] inline-flex items-center gap-2.5 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${additionalClasses}`}
    >
      {icon && <div className="w-5 h-5">{icon}</div>}
      <span className="text-black text-base font-light font-nohemi">{label}</span>
    </button>
  );
};

export default ActionButton;
