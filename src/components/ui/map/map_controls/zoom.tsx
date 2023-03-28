// @ts-nocheck
import { PigeonProps } from 'pigeon-maps';
import { Icon } from '../../icon';
import s from 'components/pages/search_result/serch_items/toggle_button/index.module.scss';
import React from 'react';

interface ZoomProps extends PigeonProps {
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    isClient?: boolean;
    closeMap?: (val: boolean) => () => void;
}

const commonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 15,
    right: 15,
    left: 'unset',
    display: 'grid',
    gap: 5,
};

const commonButtonStyle: React.CSSProperties = {
    padding: 11,
    borderRadius: 10,
    background: '#fff',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    outline: 'none',
    marginRight: '8px',
    boxShadow: '0 8px 12px rgba(153, 155, 168, 0.15)',
};

export function ZoomControl({
    style,
    buttonStyle,
    setCenterZoom,
    mapState,
    mapProps,
    isClient = false,
    closeMap,
    pagination,
}: ZoomProps): JSX.Element {
    return (
        <div
            className="pigeon-zoom-buttons pigeon-drag-block"
            style={style ? { ...commonStyle, ...style } : commonStyle}
        >
            {isClient && (
                <div style={{ ...commonButtonStyle, marginRight: '30px' }} onClick={pagination('-', 5)}>
                    <Icon name={'arrow_back'} color={'#9A9EA7'} size={18} />
                </div>
            )}

            {isClient && (
                <div onClick={closeMap(false)} style={commonButtonStyle}>
                    <Icon name={'search'} color={'#9A9EA7'} size={18} />
                </div>
            )}

            <button
                className="pigeon-zoom-in"
                type="button"
                style={buttonStyle ? { ...commonButtonStyle, ...buttonStyle } : commonButtonStyle}
                onClick={() => setCenterZoom(mapState?.center, Math.min(mapState?.zoom + 1, mapProps?.maxZoom))}
            >
                <Icon name="add_circle" size={18} color="#9A9EA7" />
            </button>
            <button
                className="pigeon-zoom-out"
                type="button"
                style={buttonStyle ? { ...commonButtonStyle, ...buttonStyle } : commonButtonStyle}
                onClick={() => setCenterZoom(mapState?.center, Math.max(mapState?.zoom - 1, mapProps?.minZoom))}
            >
                <Icon name="remove_circle" size={18} color="#9A9EA7" />
            </button>

            {isClient && (
                <div style={{ ...commonButtonStyle, marginLeft: '22px' }} onClick={pagination('+', 5)}>
                    <Icon name={'arrow_forward'} color={'#9A9EA7'} size={18} />
                </div>
            )}
        </div>
    );
}
