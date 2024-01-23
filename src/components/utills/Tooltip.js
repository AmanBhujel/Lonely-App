// ---------------Tooltip Component-----------
import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
      {isTooltipVisible && (
        <div
          style={{
            width:'5rem',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: '#fff',
            padding: '0.25rem', 
            fontSize: '0.8rem', 
            borderRadius: '4px',
            zIndex: 1,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;