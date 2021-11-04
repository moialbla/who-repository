import './Item.scss';

export const ItemShadow = () => {
  return <div className="item item--pulse" >
    <div className="item__image item__image--pulse"></div>
    <div className="block block--pulse"></div>
    <div className="item__description item__description--pulse"></div>
    <div className="block block--pulse"></div>
  </div>
}

export default ItemShadow;
