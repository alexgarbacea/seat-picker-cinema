import React, { useState } from 'react'
import { 
    MAX_SEATS_SELECT,
    roomSeatsColumns, 
    notInUseSeats, 
    roomSeatsRows,
    seatRowPrice,
    movieName, 
    movieRate, 
    movieType, 
    movieView,
} from '../Data/MockRoom'

const SeatPicker = ({switchPage, save, checker}) => {
    const [selectedSeats, setSelectedSeats] = useState([])

    const checkSeat = (row, col) => {
        let isOk = true;

        const quickCheck = (arr) => {
            arr.forEach((val) => {
                if (val[0] === row && val[1] === col) {
                    isOk = false
                    return;
                }
            })
        }
        quickCheck(notInUseSeats)
        quickCheck(checker)
        return isOk
    }

    const getSeatClass = (row, col) => {
        let classReturn = 'row'
        if (!checkSeat(row, col)) classReturn += ' disabled'

        return classReturn
    }

    const getSeatId = (row, col) => {
        return `r${row}c${col}`
    }

    const handleSeatSelect = (row, col) => {
        if (!checkSeat(row, col)) return

        const seatId = getSeatId(row, col);
        const clickedSeat = document.getElementById(seatId)
        const newSet = new Set(selectedSeats);
        if (newSet.has(seatId)) {
            newSet.delete(seatId)
            clickedSeat.classList.remove('selected')
        }
        else {
            if (selectedSeats.length >= MAX_SEATS_SELECT) return alert(`You can not book more than ${MAX_SEATS_SELECT} at once`)
            newSet.add(seatId)
            clickedSeat.classList.add('selected')
        }
        setSelectedSeats([...Array.from(newSet)])
    }

    const getRowFromId = (id) => {
        return parseInt(id.slice(id.indexOf('r') + 1, id.indexOf('c'))) + 1
    }

    const getColFromId = (id) => {
        return parseInt(id.slice(id.indexOf('c') + 1, id.length)) + 1
    }

    const getTotalPrice = () => {
        let total = 0
        selectedSeats.forEach(value => {
            total += seatRowPrice[getRowFromId(value) - 1]
        })
        return total
    }

    const saveSeats = () => {
        const arrToAdd = []
        selectedSeats.forEach(value => {
            arrToAdd.push([getRowFromId(value) - 1, getColFromId(value) - 1])
        })
        console.log(arrToAdd)
        save(arrToAdd)
        switchPage('')
    }

    return (
        <section className='center-section'>
            <div className='box w-big'>
                <h1 className='blue-font'>Pick your seats</h1>
                <h3>Today's movie: <span className='blue-font'>{movieName}</span></h3>
                <div className='movie-badges'>
                    <div title='Type'>{movieType}</div>
                    <div>{movieView}</div>
                    <div title='Rating'>{movieRate}</div>
                </div>

                <div className='picker-wrapper'>
                        <p>Screen</p>
                        <div className='picker-screen' />
                    <div className='picker-display'>
                    <div className='seat-wrapper'>
                        <table width='auto' cellPadding='0' cellSpacing='10' align='center' style={{border:'none'}}>
                            <tbody className='seats-table-body'>
                            {
                                roomSeatsRows.map((row, index) => {
                                    return(
                                        <tr key={`Row: ${index}`}>
                                            {
                                                roomSeatsColumns.map((col, i) => {
                                                    return(
                                                        <td 
                                                        key={`Col: ${i}`} colSpan='1' id={getSeatId(index, i)}
                                                        onClick={() => handleSeatSelect(index, i)}
                                                        title={`Row: ${index} Seat: ${i}`}
                                                        className={getSeatClass(index, i)}
                                                        />
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className='ticket-view'>
                        <div className='ticket-table'>
                            <h3>Your tickets</h3>
                            <div className='ticket-header'>
                                <div>Row</div>
                                <div>Seat</div>
                                <div>Price</div>
                            </div>
                            {
                                selectedSeats && selectedSeats.map((val, index) => {
                                    return(
                                        <div key={`${index} - ${val}`}>
                                            <div>{getRowFromId(val)}</div>
                                            <div>{getColFromId(val)}</div>
                                            <div>{seatRowPrice[getRowFromId(val) - 1]}$</div>
                                        </div>
                                    )
                                })
                            }
                            <div className='ticket-footer'>
                                <div>Total: {getTotalPrice()}$</div>
                            </div>
                        </div>
                    </div>
                    <div className='seat-pick-buttons'>
                        <div className='btn-secondary' onClick={() => switchPage('')}>Cancel</div>
                        <div className='btn-main' onClick={() => saveSeats()}>Book seats</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeatPicker