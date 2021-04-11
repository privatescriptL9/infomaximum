import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import ProcessCard from '../../components/ProcessCard/ProcessCard'
import './Process.scss'
import { PROCESS_LIST } from '../../graphQL/query/process'
import { Loader } from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { parseProcessList } from '../../store/actions/process'

function renderCards(processList) {
  return processList.map(card => {
    return (
      <ProcessCard
        key={card.id}
        name={card.name}
        numberOfExecutions={card.numberOfExecutions}
        averageLeadTime={card.averageLeadTime}
        averageActiveTime={card.averageActiveTime}
        employeesInvolvedProcess={card.employeesInvolvedProcess}
        numberOfScenarios={card.numberOfScenarios}
        start={card.start}
        end={card.end}
        loading={card.loading}
      />
    )
  })
}

const Process = props => {
  const { data, loading, error } = useQuery(PROCESS_LIST)

  useEffect(() => {
    if (data) {
      props.parseProcessList(data.processList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="Process">
      {loading ? <Loader /> : renderCards(props.processList)}
      {error ? (
        <span style={{ color: 'red' }}>Произошла ошибка: {error.message}</span>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    processList: state.process.processList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    parseProcessList: processList => dispatch(parseProcessList(processList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Process)
