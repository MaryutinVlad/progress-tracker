function StatisticsItem({ title, value }) {

  return (
    <div className="statistics__item">
      <p className="statistics__item-title">
        {title}
      </p>
      <p className="statistics__item-value">
        {value}
      </p>
    </div>
  )
}

export default StatisticsItem;