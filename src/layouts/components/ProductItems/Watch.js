import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ProductItems.module.scss"
import config from "src/config";
import HomeLoading from "src/components/Loading/HomeLoading";

const cx = classNames.bind(styles)

function Watch() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://api-json-server-1c2s.onrender.com/api/data?category=watch')
            .then(res => res.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
    }, [])
    const dataSlice = data.slice(0, 4)
    return (
        <>
            {loading && <HomeLoading />}
            {!loading && <div>
                <h1 className={cx('heading')}>Apple Watch</h1>
                <div className={cx('grid wide')}>
                    <div className={cx('row wide')}>
                        {dataSlice.map((product) =>
                            <div className={cx('col wide l-3 m-4 c-6')} key={product.id}>
                                <Link to={`watchs/${product.id}`} className={cx('wrapper')}>
                                    <div className={cx('background-product')} style={{ backgroundImage: `url(${product.image})` }}></div>
                                    <p className={cx('product-name')}>{product.name}</p>
                                    <p className={cx('product-price')}>Giá từ {(product.price).toLocaleString().concat('đ')}</p>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={cx('button-wrapper')}>
                        <Link to={config.routes.watch} className={cx('button')}>Xem tất cả</Link>
                    </div>
                </div>
            </div >}
        </>
    );
}

export default Watch;