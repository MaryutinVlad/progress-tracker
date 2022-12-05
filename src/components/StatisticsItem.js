function StatisticsItem({ title, value }) {
  return (
    <div className="statistics__item">
      <p className="statistics__item-title">
        {title}
      </p>
      <p className="statistics__item-value">
        0
      </p>
    </div>
  )
}

export default StatisticsItem;