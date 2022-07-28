import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import PropTypes from 'prop-types'

const cx = classNames.bind(styles)

// Create default function when no transmission onChange
const defaultFn = () => {}

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return <MenuItem key={index} data={item} onClick={() => {
                if(isParent) {
                    setHistory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }} />
        })
    }

    // Back previous menu 
    const handleBackMenu = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }

    const renderResult = (attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
        <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && (
                <Header 
                    title={current.title} 
                    onBack={handleBackMenu}
                />
            )}
            <div className={cx('menu-body')}>{renderItems()}</div>
        </PopperWrapper>
        </div>
    )

    // Reset to first page menu
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1))
    }

    return (
        <Tippy
            interactive
            delay={[0, 500]}
            offset={[16, 8]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={renderResult}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired ,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;
