import React, {useState} from 'react';
import styles from './Pagination.module.css';
import cn from 'classnames';


const Pagination = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = pagesCount / portionSize;
    const [portionNumber, setPortionNumber] = useState(1);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return <div>
        {portionNumber > 1 &&
            <button className={styles.btn}
                    onClick={() => setPortionNumber(portionNumber - 1)}>&#9668; Prev</button>
        }

        {pages
            .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
            .map(page => {
                return <span className={cn(styles.pageNumber, { [styles.selected]: currentPage === page })}
                             key={page}
                             onClick={() => onPageChanged(page)}> {page} </span>
            })}

        {portionCount > portionNumber &&
            <button className={styles.btn}
                    onClick={() => setPortionNumber(portionNumber + 1)}>&#9658; Next</button>
        }
    </div>
}

export default Pagination;