import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useState, forwardRef } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'

// Không truyền fallback từ ngoài vào thì nó sẽ lấy mặc định là images.noImage
// fallback: customFallback -> đổi tên fallback -> customFallback
const Image = forwardRef(({src, alt, className, fallback: customFallback = images.noImage, ...props}, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback)
    }

    return (
        <img 
            className={classNames(styles.wrapper, className)}  // Mặc định component image vẫn có thuộc tính css của wrapper, muốn custom riêng thì truyền thêm className vào
            ref={ref} 
            src={fallback || src} // Nếu có fallback sẽ chọn fallback
            alt={alt} {...props} 
            onError={handleError} />
    )
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image