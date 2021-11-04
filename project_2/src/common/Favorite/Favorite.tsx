import './Favorite.scss';
import { ReactComponent as Activated } from '../../assets/img/star_activated.svg';
import { ReactComponent as Desactivated } from '../../assets/img/star_desactivated.svg';
import { FavoriteProps } from '../Models/FavoriteProps';

export const Favorite = ({ item, favoriteEvent }: FavoriteProps) => {
  const swapFavorite = () => {
    favoriteEvent && favoriteEvent();
  }
  return <div className="favorite">
    {item.favorite === "1" ? <Activated className="favorite__icon" onClick={swapFavorite}></Activated> : <Desactivated className="favorite__icon" onClick={swapFavorite}></Desactivated>}
  </div>
}

export default Favorite;
