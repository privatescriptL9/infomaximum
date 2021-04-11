import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import ProcessCard from '../../components/ProcessCard/ProcessCard'
import './Process.scss'
import { PROCESS_LIST } from '../../graphQL/query/process'
import { Loader } from '../../components/UI/Loader/Loader'

function renderCards(processList) {
  return (
    processList.map(card => {
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
  )
}

const Process = () => {
  const { data, loading, error } = useQuery(PROCESS_LIST)
  const [processList, setProcesses] = useState([])

  useEffect(() => {
    if (data) {
      setProcesses(data.processList)
    }
  }, [data])
  
  return (
    <div className="Process">
      { 
        loading 
        ? <Loader /> 
        : renderCards(processList) 
      }
      { 
        error 
        ? <span style={{color: 'red'}}>Произошла ошибка: {error.message}</span> 
        : null 
      }
    </div>
  )
}

export default Process
