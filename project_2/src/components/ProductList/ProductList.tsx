import { ProductListProps } from "../../common/Models/ProductListProps";
import { CartItemType } from "../../common/Models/CartItemType";
import { Item, ItemShadow } from '../../common';
import { useState, useEffect, useCallback, useRef, } from "react";
import './ProductList.scss';
import { t } from '../../core';
import { useDispatch, useSelector } from '../../core/Context';
import { getProductsAction, getProductsFavoriteAction, setFavoriteAction, clearProductList, setCurrentPage } from '../../contexts/grocery';
import { RootState } from '../../store';

export const ProductList = ({ handleAddToCart }: ProductListProps) => {

   
    const [favorite, setFavorite] = useState(true);
    const items = useSelector((state: RootState) => state.grocery.products);
    const inProgress = useSelector((state: RootState) => state.grocery.inProgress);
    const totalResults = useSelector((state: RootState) => state.grocery.totalResults);
    const currentPage = useSelector((state: RootState) => state.grocery.currentPage); 
    const [page, setPage] = useState(currentPage);
    const dispatch = useDispatch();
    const listPanel = useRef<HTMLDivElement>(null);

    const addPage = () => {
        setPage(currentPage + 1);
        dispatch(setCurrentPage(1));
    }

    const loadMore = () => {
        if (items.length < totalResults) {
            addPage();
            dispatch(getProductsAction(page));
        }
    }

    const APIRequest = useCallback(() => {
        addPage();
        dispatch(getProductsAction(page));
    }, [dispatch])

    const trackScrolling = () => {
        if (!listPanel || !listPanel.current)
            throw "The element is null";
        if (listPanel && listPanel.current && (listPanel.current.scrollHeight - listPanel.current.scrollTop - 20) < listPanel.current.clientHeight) {
            loadMore();
        }
    };

    const getFavorites = () => {
        dispatch(clearProductList());
        if (favorite) {
            dispatch(getProductsFavoriteAction());
        } else {
            setPage(1);
            dispatch(getProductsAction(page));
        }
        setFavorite(!favorite);
    }

    const addToFavorite = (item: CartItemType) => {
        dispatch(setFavoriteAction(item));
    }

    useEffect(() => {
        APIRequest();
    }, [APIRequest]);

    useEffect(() => {
        listPanel && listPanel.current && listPanel.current.addEventListener('scroll', trackScrolling);
        return () => {
            listPanel && listPanel.current && listPanel.current.removeEventListener('scroll', trackScrolling);
        }
    }, [trackScrolling])

    return (<div className="app-grid app-dir-row productList">
        <div className="app-col app-grid">
            <div className="app-col">{t("list_title")}</div>
            <div className="app-col"><a href="#" onClick={getFavorites} className="productList__favorites">{t("favourites")}</a></div>
        </div>
        <div className="app-grid app-justify-center productList__items" ref={listPanel}>
            {items.length > 0 && items.map(item => { return <Item key={item.id} item={item} setFavorite={addToFavorite} handleAddToCart={handleAddToCart}></Item> })}
            {inProgress && [...Array(20)].map((item, index) => <ItemShadow key={index}></ItemShadow>)}
        </div>
    </div>);
}