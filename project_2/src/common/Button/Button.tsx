import './Button.scss';
import { ButtonProps } from '../Models/ButtonProps';

/**
 * Creates a button instance using a text and click event.
 * @version 1.0.0
 * @param { ButtonProps }  button properties. 
 * @author [moialbla](https://github.com/moialbla/shopping)
 * @returns Button component.
 * @public
 */
export const Button = ({ text, click }: ButtonProps) => {

    const perform = () => {
        click && click();
    }
    
    return <div className="button"  data-testid="button">
        <a href="#" className="white" data-testid="button__a" onClick={perform}>
            <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text" data-testid="button__text">{text}</span>
            </p>
        </a>
    </div>
}

export default Button;
