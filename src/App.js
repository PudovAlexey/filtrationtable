
import './App.scss';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import SwitchColor from "./switchColor";

function App() {
  let [tableState, setTabeState] = useState({
    tableArr: [
      { user: 'stalker777', currentPTX: 700, lovelyPerk: 'Killer', attempts: 3 },
      { user: 'Ivan256', currentPTX: 320, lovelyPerk: 'Ninja', attempts: 1 },
      { user: 'Anonimus', currentPTX: 100, lovelyPerk: 'Bomber', attempts: 10 },
      { user: 'Doublekill', currentPTX: 200, lovelyPerk: 'Electrican', attempts: 15 },
      { user: 'striker', currentPTX: 250, lovelyPerk: 'Ninja', attempts: 8 },
      { user: 'riper225', currentPTX: 700, lovelyPerk: 'Killer', attempts: 10 },
      { user: 'shooter', currentPTX: 180, lovelyPerk: 'Killer', attempts: 7 },
      { user: 'silverhand', currentPTX: 500, lovelyPerk: 'Killer', attempts: 25 },
      { user: 'Spliter', currentPTX: 125, lovelyPerk: 'Ninja', attempts: 10 },
      { user: 'Spliter', currentPTX: 1100, lovelyPerk: 'Ninja', attempts: 10 }
    ],
    filteredItems: [],
    paginationCounter: [],
    rowPerPage: 3,
    nickFilter: '',
    ptxFilter: 0,
    perkFilter: 'All',
    attemptsFilter: 0,
  }
  )

  let [paginationState, setPaginationState] = useState([]);
  let [currentPageState, setCurrentPageState] = useState(1)
  let [sortUser, setSortUser] = useState(true);
  let [sortPTX, useSortPTX] = useState(true);
  let [sortPerk, useSortPerk] = useState(true);
  let [sortAttempt, useSortAttempt] = useState(true);
  let [scrollPages, useScrollPages] = useState({currentPage: 0, scrollTo: 0})

  useEffect(() => {

    let arr = []
    let firstPage = tableState.nickFilter == '' && tableState.perkFilter == 'All' && tableState.attemptsFilter == 0 && tableState.ptxFilter == 0 ? tableState.tableArr.slice(0, tableState.rowPerPage) : tableState.filteredItems.slice(0, tableState.rowPerPage)
    let filtered = [] 
    if (tableState.nickFilter !== '' || tableState.perkFilter !== 'All' || tableState.attemptsFilter !== 0 || tableState.ptxFilter == 0) {filtered = filterHandler(tableState.nickFilter, tableState.ptxFilter, tableState.perkFilter, tableState.attemptsFilter)} else {filtered = []}
    let paginationCondition = tableState.filteredItems.length == 0 ? tableState.tableArr : tableState.filteredItems
    console.log(tableState.filteredItems)

    function createPaginationArr(tableValue) {

      let paginationValue = Math.ceil(tableValue.length / tableState.rowPerPage)
      for (let i = 0; i <= paginationValue - 1; i++) {
        arr.push(i)
      }
      return arr
    }

    setTabeState(
    {
        ...tableState,
        paginationCounter: createPaginationArr(paginationCondition),
        // filteredItems: filtered
      })

    setPaginationState(firstPage)


  }, [tableState.rowPerPage, tableState.filteredItems, sortUser, sortPTX, sortPerk, sortUser, sortAttempt, tableState.nickFilter, tableState.ptxFilter, tableState.attemptsFilter, tableState.perkFilter, tableState.tableArr])

  let scrollStyles = {
    display: 'flex',
    transform: `translateX(${scrollPages.scrollTo}px)`,
    transition: 'all ease .3s',
    alignItems: 'center',
  }

  let leftBtnStyle = {
    opacity: 1  ,
    transition: 'all ease .3s'
  }

  let rightBtnStyle = {
    opacity: 1,
    transition: 'all ease .3s'
  }

  function convertToTable(Arr) {
    let tableRows = Arr.map((item, index) => {
      return (
        <tr className="table__row" key={index}>
          <td className="table__user"><span className="table__data-decor table__data-decor--user">{item.user}</span></td>
          <td className="table__ptx"><span className="table__data-decor table__data-decor--PTX">{item.currentPTX}</span></td>
          <td className="table__perk"><span className={getColorByPerk(item.lovelyPerk)}>{item.lovelyPerk}</span></td>
          <td className="table__attempts"><span className="table__data-decor table__data-decor--attempts">{item.attempts}</span></td>
        </tr>
      )
    })

    return tableRows

  }

  let pagination = tableState.paginationCounter.map((item, index) => {
    return <button key={index + 1} className={currentPageState == index + 1 ? "table__page-dot table__page-dot--active" : "table__page-dot"} onClick={() => { showCurrentPageClickHandler(index + 1) }}>{index + 1}</button>
  })

  function showCurrentPageClickHandler(currentPage) {
    let showCurrentPage = currentPage * tableState.rowPerPage
    let showInPage = showCurrentPage - tableState.rowPerPage

    let showPaginatedTable = tableState.tableArr.slice(showInPage, showCurrentPage)

    setPaginationState(
      showPaginatedTable
    )

    setCurrentPageState(currentPage)
  }

  function SortHandler(sortedItem) {
    let sortedBy = tableState.filteredItems.length == 0 ? tableState.tableArr : tableState.filteredItems
    let sortFromUser = sortUser ? 'start' : 'end'
    let sortFromPTX = sortPTX ? 'start' : 'end'
    let sortFromPerk = sortPerk ? 'start' : 'end'
    let sortFromAttempt = sortAttempt ? 'start' : 'end'

    switch (sortedItem) {
      case 'userSort':
        setTabeState({ ...tableState, tableArr: SortByUser(sortedBy, sortFromUser) })
        break;
      case 'ptxSort':
        setTabeState({ ...tableState, tableArr: SortByPTX(sortedBy, sortFromPTX) })
        break;
      case 'perkSort':
        setTabeState({ ...tableState, tableArr: SortByPerk(sortedBy, sortFromPerk) })
        break;
      case 'attemptSort':
        setTabeState({ ...tableState, tableArr: SortByAttempt(sortedBy, sortFromAttempt) })
        break;
    }

    function SortByUser(state, sortFrom) {
      setSortUser(!sortUser)
      let sortByUser = state.sort((a, b) => {
        let lowerA = a.lovelyPerk.toLowerCase()
        let lowerB = b.lovelyPerk.toLowerCase()
        if (sortFrom === 'start' ? lowerA > lowerB : lowerA < lowerB) {
          return 1;
        }
        if (sortFrom === 'start' ? lowerA < lowerB : lowerA > lowerB) {
          return -1;
        }
        return 0;
      })

      return sortByUser
    }

    function SortByPerk(state, sortFrom) {
      useSortPerk(!sortPerk)
      let sortByPerk = state.sort((a, b) => {

        let lowerA = a.lovelyPerk.toLowerCase()
        let lowerB = b.lovelyPerk.toLowerCase()
        if (sortFrom === 'start' ? lowerA > lowerB : lowerA < lowerB) {
          return 1;
        }
        if (sortFrom === 'start' ? lowerA < lowerB : lowerA > lowerB) {
          return -1;
        }
        return 0;
      })

      return sortByPerk
    }

    function SortByPTX(state, sortFrom) {
      useSortPTX(!sortPTX)
      let ptxSort = state.sort((a, b) => {
        return sortFrom === 'start' ? a.currentPTX - b.currentPTX : b.currentPTX - a.currentPTX
      })
      return ptxSort
    }

    function SortByAttempt(state, sortFrom) {
      useSortAttempt(!sortAttempt)
      let ptxAttempt = state.sort((a, b) => {
        return sortFrom === 'start' ? a.attempts - b.attempts : b.attempts - a.attempts
      })

      return ptxAttempt
    }
  }

  function filterHandler(userName, ptx, perk, attempts) {
    
    let finalFilter = tableState.tableArr.filter(item => {
      let lowerUser = item.user !== null ? item.user.toLowerCase() : ''
      let lowerCheckUser = userName !== null ? userName.toLowerCase() : ''
      let lowerPerk = item.lovelyPerk !== null ? item.lovelyPerk.toLowerCase() : ''
      let lowerCheckPerk = perk !== null ? perk.toLowerCase() : ''
  
      if ( (lowerUser.indexOf(lowerCheckUser) === 0 || userName == '') && (lowerPerk.indexOf(lowerCheckPerk) === 0 || perk == 'All') && (item.attempts >= attempts || attempts === 0) && (item.currentPTX >= ptx || ptx === 0)  ) {
        return true
      } else {
        return false
      }
    })

    return finalFilter
}


    function userFilterHandler(event) {
    let userName = event.target.value

    setTabeState({
      ...tableState,
      nickFilter: userName,
      filteredItems: filterHandler(userName, tableState.ptxFilter, tableState.perkFilter, tableState.attemptsFilter)
    })

  }

  function ptxFilterHandler(event) {
    let ptx = event.target.value



    setTabeState({
      ...tableState,
      ptxFilter: ptx,
      filteredItems: filterHandler(tableState.nickFilter, ptx, tableState.perkFilter, tableState.attemptsFilter)
    })
  }

  function perkFilterHandler(event) {
    let perk = event.target.value



    setTabeState({
      ...tableState,
      perkFilter: perk,
      filteredItems: filterHandler(tableState.nickFilter, tableState.ptxFilter, perk, tableState.attemptsFilter)
    })

  }

  function attemptFilterHandler(event) {
    let attempts = event.target.value



    setTabeState({
      ...tableState,
      attemptsFilter: attempts,
      filteredItems: filterHandler(tableState.nickFilter, tableState.ptxFilter, tableState.perkFilter, attempts)
    })
  }

  function choseRowsHandler(event) {
    let switchRow = event.target.value > 0 ? event.target.value : 1 

    setTabeState(
      {
        ...tableState,
        rowPerPage: switchRow
      }
    )
  }

  function getColorByPerk(isPerk) {
    switch (isPerk) {
      case 'Killer': 
      return 'table__data-decor--perk table__data-decor--perk table__data-decor--Killer' 
      break
      case 'Ninja': 
      return 'table__data-decor--perk table__data-decor--perk table__data-decor--Ninja' 
      break
      case 'Bomber': 
      return 'table__data-decor--perk table__data-decor--perk table__data-decor--Bomber' 
      break
      case 'Electrican': 
      return 'table__data-decor--perk table__data-decor--perk table__data-decor--Electrican' 
      break
    }
  }

  function SwitchCurrentPageHandler(isClicked, countElement) {
    console.log(isClicked, countElement)
    let allPages = Math.floor(countElement / 3)
    let scrollDirection = 0
    let currentPage = scrollPages.currentPage

    switch(isClicked) {
      case 'nextButton':
        if (currentPage < allPages) {currentPage += 1} 
        break
      case 'prevButton':
        if (currentPage > 0) {currentPage -= 1}  
        break
    }

    console.log(currentPage)

    

     scrollDirection = -currentPage * 70

     console.log(scrollDirection)
  

    useScrollPages({currentPage: currentPage, scrollTo: scrollDirection})

  }

  return (
    <div className="App">
      <h1 className="task">Задание 1</h1>
      <table className="table">
        <caption className="table__caption">Таблица статистики</caption>
        <thead className="table__head">
          <tr>
            <td>
              <div className="table__search"><input className="table__user" type="text" value={tableState.nickFilter} onChange={userFilterHandler} /></div>
              <div className="table__sort" onClick={() => SortHandler('userSort')}></div>
            </td>

            <td>
              <div className="table__search"><input className="table__ptx" min="0" max="1000" type="range" value={tableState.ptxFilter} onChange={ptxFilterHandler} /></div>
              <div className="table__sort" onClick={() => SortHandler('ptxSort')}></div>
            </td>

            <td>
              <div className="table__search">
                <select className="table__perk" value={tableState.perkFilter} onChange={perkFilterHandler}>
                  <option value="All">All</option>
                  <option value="Killer">Killer</option>
                  <option value="Ninja">Ninja</option>
                  <option value="Bomber">Bomber</option>
                  <option value="Electrican">Electrican</option>
                </select>
              </div>
              <div className="table__sort" onClick={() => SortHandler('perkSort')}></div>
            </td>
            <td>
              <div className="table__search">
                <input className="table__attempt" min="0" max="100" type="range" value={tableState.attemptsFilter} onChange={attemptFilterHandler} />
              </div>
              <div className="table__sort" onClick={() => SortHandler('attemptSort')}></div>
            </td>
          </tr>
        </thead>

        <tbody className="table__body">
          {convertToTable(paginationState)}
        </tbody>
      </table>
      <div className="table__tools">
      <div className="table__pagination-box">
        <div style={leftBtnStyle} className="table__arrow table__arrow--left" onClick ={() => SwitchCurrentPageHandler('prevButton', pagination.length)}></div>
        <div className="table__pagination">
          <div className="table__pagination-slick-box">
          <div className="table__pagination-slick">
            <div style={scrollStyles} className="table__pagination-item table__pagination-item--current">{pagination} </div>
            </div>
          </div>
          <div className="table__pagination-item table__pagination-item--slash">/</div>
            <div className="table__pagination-item table__pagination-item--max">{pagination.length}</div>
        </div>
        <div style={rightBtnStyle} className="table__arrow table__arrow--right" onClick ={() => SwitchCurrentPageHandler('nextButton', pagination.length)}></div>
      </div>
      <div className="table__other-tools">
      <div className="table__pagination__switcher-box">Rows per page: <input type="number" className="table__pagination-switcher" value={tableState.rowPerPage} onChange={choseRowsHandler}/></div>
      </div>
      </div>

      <h1 className="task">Задание 2</h1>
      <SwitchColor/>
    </div>
  );
}

export default App;
