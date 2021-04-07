import ProcessCard from '../../components/ProcessCard/ProcessCard'
import './Process.scss'

function renderCards(cards) {
  return (
    cards.map((card, index) => {
      return (
        <ProcessCard
          key={index}
          title={card.title}
          performed={card.performed}
          averageLeadTime={card.averageLeadTime}
          averageActiveTime={card.averageActiveTime}
          employees={card.employees}
          scen={card.scen}
          timeStart={card.timeStart}
          timeEnd={card.timeEnd}
          loading={card.loading}
        />
      )
    })
  )
}

const Process = () => {
  const cards = [
    {
      title: 'Рассмотрение кредитной заявки',
      performed: '340 487',
      averageLeadTime: '10ч 36 мин',
      averageActiveTime: '1ч 7 мин (10,5%)',
      employees: '120 сотрудников',
      scen: '129 сценариев',
      timeStart: '11 ноября 2017',
      timeEnd: '6 января 2018',
      loading: '10 января 2018',
    },
    {
      title: 'Подготовка и прохождение платежей',
      performed: '981',
      averageLeadTime: '24ч',
      averageActiveTime: '1ч (4,2%)',
      employees: '3 сотрудника',
      scen: '7 сценариев',
      timeStart: '11 ноября 2017',
      timeEnd: '6 января 2018',
      loading: '10 января 2018',
    },
    {
      title: 'Оформление страховых премий',
      performed: '340 487',
      averageLeadTime: '76ч 47 мин',
      averageActiveTime: '1ч 7 мин (10,5%)',
      employees: '53 сотрудника',
      scen: '129 сценариев',
      timeStart: '11 ноября 2017',
      timeEnd: '6 января 2018',
      loading: '10 января 2018',
    },
  ]

  return (
    <div className="Process">
      {renderCards(cards)}
    </div>
  )
}

export default Process
