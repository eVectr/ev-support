import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/surveycard.css'

const SurveyCard = (props) => {

  const [selectedOption, setSelectedOption] = useState('')
  const [question, setQusetion] = useState([])
  const [survey, setSurvey] = useState([])
  let handleradioleChange = (index, e) => {
    let val = e.target.value
    // setSelectedOption(prev => {
    //   const update = prev.concat(val)
    //   return update
    // })
    setSelectedOption(e.target.value)
    setQusetion(prev => {
      const update = prev.concat(index)
      return update
  })
   // setQusetion(index)
  }

  useEffect(() => {
    axios.get(`http://localhost:7777/getclientsurvey`)
      .then(res => {
        let { data = [] } = res
        console.log("data ==>", data)
        setSurvey(data)
      })
  }, [])


    console.log("question ===>", question)
    console.log("includes ==>",question.includes(0))
    console.log(" selectedOption ==>", selectedOption)
  
    return(
      <div className="container">
        <div className="row">
          <div className='survey-card'>
            <div class="card">

              <div className='card-header '>
                <p className="card-header-title card-heading "> <i class="fas fa-cog"></i> Client Survey</p>
              </div> 

              <div className="checkboxes">
                    <p className='survey-question'>{survey.length?survey[0].Question:'No Q'}</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question.includes(0) && selectedOption.includes('YES')}  onChange={(event) =>handleradioleChange(0,event)}/> YES
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value='NO'  checked={question.includes(0) && selectedOption.includes('NO')}  onChange={(event) =>handleradioleChange(0, event)}/>NO
                    </label>
                </div>
              </div>

              {question.includes(0) && selectedOption.includes('YES')?
                <div className="checkboxes">
                  <p className='survey-question'>{survey.length?survey[1].Question:'No Q'}</p>
                  <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                      <input type="checkbox" value='YES' checked={question.includes(1) && selectedOption.includes('YES')} onChange={(event) =>handleradioleChange(1,event)} /> YES
                 </label>

                    <label class="checkbox-inline">
                      <input type="checkbox" value='NO' checked={question.includes(1) && selectedOption.includes('NO')} onChange={(event) =>handleradioleChange(1,event)} />NO
                 </label>
                  </div>
                </div>:
                ''
              }
             

            {question.includes(0) && selectedOption.includes('NO') ?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[2].Question : 'No Q'}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value='YES' checked={question.includes(2) && selectedOption.includes('YES')} onChange={(event) =>handleradioleChange(2,event)}  /> YES
                </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" value='NO' checked={question.includes(2) && selectedOption.includes('NO')} onChange={(event) =>handleradioleChange(2,event)} />NO
               </label>
                </div>
              </div>:
              ''
              }


            <div className='survey-btn'>
              <a class="button is-primary"><span className='btn-angle-down'><i class="fas fa-angle-down"></i></span>SUBMIT</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}



export default SurveyCard 