import {useState} from "react";
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'


function Searchbar({onSubmit}){

    const [searchString, setSearchString] = useState('')

    const handleChange = event => {
        setSearchString(event.target.value.toLowerCase())
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (searchString.trim() === '') {
            alert('input string to search');
            return;
        }

        onSubmit(searchString);
    }

    return(
        <header className={s.searchbar}>
            <form className="form">
                <button type="submit" onClick={handleSubmit}>
                    <span className="button-label">Search</span>
                </button>
    
                <input
                className="input"
                type="text"
                placeholder="Search images and photos"
                value={searchString}
                onChange={handleChange}
                />
            </form>
        </header>
        )    
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default Searchbar;