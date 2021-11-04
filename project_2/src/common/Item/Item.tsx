import './Item.scss';
import { ItemProps } from '../Models/ItemProps';
import { Button } from '../Button';
import { Favorite } from '../Favorite';
import { t } from '../../core';

export const Item = ({ item, handleAddToCart, setFavorite }: ItemProps) => {
  return <div className="item">
    <div className="item__image"><img src={item.image_url} /></div>
    <div className="item__button"> <Favorite item={item} favoriteEvent={() => setFavorite(item)} ></Favorite></div>
    <div className="block">
      <div className="block__title"><span className="item__text">{item.productName}</span></div>
      <div className="block__price"><span className="item__text">{item.price} {t("item.currency")}</span></div>
    </div>
    <div className="item__description"><span className="item__text">{item.productDescription}</span></div>
    <div className="block block--margin">
      <div className="block__left"><span className="item__text">{item.stock} {t("item.left")}</span></div>
      <div className="block__add"><Button text={t("item.add")} click={() => handleAddToCart(item)}></Button></div>
    </div>
  </div>
}

export default Item;
