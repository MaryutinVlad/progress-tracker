import implementations from '../resources/listOfImplementations.json'
import overview from '../resources/overview.json'

function FrontPage() {
  return (
    <div className="frontPage">
      <h2 className="frontPage__title">
        progress tracker information
      </h2>
      <div className="frontPage__container">
        <div className="frontPage__subcontainer">
          <h3 className="frontPage__subtitle">
            version 0.8
          </h3>
          <ul className="frontPage__list">
            {implementations.finished.map(item => {
              return (
                <li
                  className='frontPage__list-item frontPage__list-item_finished'
                  key={`${Math.random() * 10000}fin`}
                >
                  {item}
                </li>
              )
            })}
            {implementations.toDo.map(item => {
              return (
                <li
                  className='frontPage__list-item frontPage__list-item_todo'
                  key={`${Math.random() * 10000}td`}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="frontPage__subcontainer">
          <h3 className='frontPage__subtitle'>
            Overview
          </h3>
          <ul className='frontPage__list'>
            {overview.map(item => {
              return (
                <li
                  className='frontPage__list-item'
                  key={`${Math.random() * 10000}tut`}
                >
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FrontPage;