import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import Swatch, { SwatchRectRenderProps, SwatchProps } from '@uiw/react-color-swatch';
import { CircleProps } from '@uiw/react-color-circle';
import { validHex, hexToHsva, HsvaColor, hsvaToHex, color as handleColor } from '@uiw/color-convert';

/// This is copied from '@uiw/react-color-circle' and modified in onMouseEnter/Leave event handlers
/// to address specific use case: color being selected shouldn't shrink to scale(1.0) when clicked outside color circle
export const CustomCircle = React.forwardRef<HTMLDivElement, CircleProps>((props, ref) => {
    const {
      prefixCls = 'w-color-circle',
      className,
      color,
      colors = [],
      rectProps = {},
      pointProps = {},
      onChange,
      ...other
    } = props;
    const hsva = (typeof color === 'string' && validHex(color) ? hexToHsva(color) : color || {}) as HsvaColor;
    const hex = color ? hsvaToHex(hsva) : '';
    const cls = [prefixCls, className].filter(Boolean).join(' ');
    const clsPoint = [`${prefixCls}-point`, pointProps?.className].filter(Boolean).join(' ');
    return (
      <Swatch
        ref={ref}
        colors={colors}
        color={hex}
        {...other}
        className={cls}
        rectRender={({ ...props }) => (
          <Point
            {...props}
            {...pointProps}
            style={{ ...props.style, ...pointProps.style }}
            className={clsPoint}
            rectProps={rectProps}
          />
        )}
        onChange={(hsvColor) => {
          onChange && onChange(handleColor(hsvColor));
        }}
      />
    );
  });


interface PointProps extends SwatchRectRenderProps {
  rectProps?: SwatchProps['rectProps'];
  className?: string;
}

const Point = ({ style, className, title, checked, color, onClick, rectProps }: PointProps) => {
  const btn = useRef<HTMLDivElement>(null);
  const handleMouseEnter = useCallback(() => {
    btn.current!.style['transform'] = 'scale(1.2)';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!checked) {
        btn.current!.style['transform'] = 'scale(1)';
    }
  }, [checked]);

  const styleWrapper = {
    '--circle-point-background-color': '#fff',
    height: checked ? '100%' : 0,
    width: checked ? '100%' : 0,
    borderRadius: '50%',
    backgroundColor: 'var(--circle-point-background-color)',
    boxSizing: 'border-box',
    transition: 'height 100ms ease 0s, width 100ms ease 0s',
    ...rectProps!.style,
    border: checked ? '1px solid rgba(0, 0, 0, 0.12)' : 'transparent',
  } as CSSProperties;

  useEffect(() => {
    if (!checked) {
        btn.current!.style['transform'] = 'scale(1)';
    } else {
        btn.current!.style['transform'] = 'scale(1.2)';
    }
  }, [checked]);

  return (
    <div
      ref={btn}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={title}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: '50%',
        marginRight: 12,
        marginBottom: 12,
        boxSizing: 'border-box',
        transform: 'scale(1)',
        boxShadow: `${color} 0px 0px ${checked ? 5 : 0}px`,
        transition: 'transform 100ms ease 0s, box-shadow 100ms ease 0s',
        ...style,
      }}
    >
      <div {...rectProps} style={styleWrapper} />
    </div>
  );
}