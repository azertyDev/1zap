// @ts-nocheck
import { PigeonProps } from 'pigeon-maps';
import { Icon } from '../icon';

interface ZoomProps extends PigeonProps {
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
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
};

export function ZoomControl({ style, buttonStyle, setCenterZoom, mapState, mapProps }: ZoomProps): JSX.Element {
    return (
        <div
            className="pigeon-zoom-buttons pigeon-drag-block"
            style={style ? { ...commonStyle, ...style } : commonStyle}
        >
            <button
                className="pigeon-zoom-in"
                type="button"
                style={buttonStyle ? { ...commonButtonStyle, ...buttonStyle } : commonButtonStyle}
                onClick={() => setCenterZoom(mapState.center, Math.min(mapState.zoom + 1, mapProps.maxZoom))}
            >
                <Icon name="add_circle" size={18} color="#9A9EA7" />
            </button>
            <button
                className="pigeon-zoom-out"
                type="button"
                style={buttonStyle ? { ...commonButtonStyle, ...buttonStyle } : commonButtonStyle}
                onClick={() => setCenterZoom(mapState.center, Math.max(mapState.zoom - 1, mapProps.minZoom))}
            >
                <Icon name="remove_circle" size={18} color="#9A9EA7" />
            </button>
        </div>
    );
}
