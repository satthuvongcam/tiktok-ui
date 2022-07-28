import { useState, useEffect } from "react";

function useDebounce (value, delay) {
    // Lần đầu tiên chạy thì debouncedValue lấy value làm giá trị init
    // Những lần sau đó thì debouncedValue vẫn lấy value lần đầu tiên làm giá trị init
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)

        return () => clearTimeout(handler)

    }, [value])

    // Trả về chuỗi rỗng
    // Những lần sau do gõ liên tục nên chưa kịp xử lí nó vẫn trả ra chuổi rỗng -> dừng lại mới thành value cuối cùng 
    return debouncedValue
}

export default useDebounce