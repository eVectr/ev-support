import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import '../../styles/surveycard.css'
import { SelectedReason } from '../../redux/actions/notification/notification';

const SurveyCard = (props) => {

  const [survey, setSurvey] = useState([])
  let [selectedOption, setSelectedOption ] = useState('')
  let [question1check, setQuestion1check ] = useState('')
  let [Question1Res, setQuestion1Res ] = useState('')
  let [Question2Res, setQuestion2Res ] = useState('')
  let [Question3Res, setQuestion3Res ] = useState('')
  let [Question4Res, setQuestion4Res ] = useState('')
  let [question2, setQuestion2 ] = useState(null)
  let [question2check, setQuestion2check ] = useState('')
  let [question3, setQuestion3 ] = useState()
  let [question3check, setQuestion3check ] = useState('')
  let [question4, setQuestion4 ] = useState()
  let [question4check, setQuestion4check ] = useState('')
 

  let showQuestions = (Case) =>{
    switch(Case) {
      case 'case1':
        setQuestion2(true)
        setQuestion3(false)
        break;
      case 'case2':
        setQuestion4(false)
        setQuestion2(false)
        setQuestion3(true)
        break;
      case 'case3':
        setQuestion4(false)
        break;
      case 'case8':
        setQuestion4(true)
        break;
      
    }
  }

  let optionCheck = (index, val) =>{
    switch(index) {
      case 1:
        setQuestion1Res(survey[0].Question)
        setQuestion1check(val)
        break;
      case 2:
        setQuestion2Res(survey[1].Question)
        setQuestion2check(val)
        break;
      case 3:
        setQuestion3Res(survey[2].Question)
        setQuestion3check(val)
        break;
      case 4:
        setQuestion4Res(survey[3].Question)
        setQuestion4check(val)
    }
  }

  let handleradioleChange = (index,Case, e) => {
    let val = e.target.value
    showQuestions(Case)
    optionCheck(index, val)
  }

  useEffect(() => {
    axios.get(`http://18.219.191.74:7777/getclientsurvey`)
      .then(res => {
        let { data = [] } = res
        console.log("data ==>", data)
        setSurvey(data)
      })
  }, [])

  let onSubmit = () => {
    let Question1Response = {
      question: Question1Res,
      answer: question1check
    }
    let Question2Response = {
      question: Question2Res,
      answer: question2check
    }
    let Question3Response = {
      question: Question3Res,
      answer: question3check
    }
    let Question4Response = {
      question: Question2Res,
      answer: question4check
    }

    if (question3check == 'YES' || question4check == 'YES') {
      props.dispatch(SelectedReason('clientsurvey'))
      props.history.push('/contact/3')
    }

    axios.post(`http://localhost:7777/clientSurveyResponse`, {Question1Response, Question2Response,
    Question3Response, Question4Response})
      .then(res => {
        console.log("response ===???", res)
      })
  } 

  console.log("survey ------==>", survey)
    return(
      <div className="container">
        <div className="row">
          <div className='survey-card'>
            <div class="surveycard">

              <div className='card-header '>
                <p className="card-header-title card-heading "> <i class="fas fa-cog"></i> Client Survey</p>
              </div> 

              <div className="checkboxes">
                    <p className='survey-question'>{survey.length?survey[0].Question:'Loadin Qusetion'}</p>
                    <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value={survey.length?survey[0].Option1.OptionValue[0]:''} checked={question1check =='YES'}  onChange={(event) =>handleradioleChange(1, 'case1', event)}/> {survey.length?survey[0].Option1.OptionValue[0]:''}
                    </label>

                    <label class="checkbox-inline">
                    <input type="checkbox" value={survey.length?survey[0].Option1.OptionValue[1]:''}  checked={question1check == 'NO'}  onChange={(event) =>handleradioleChange(1, 'case2', event)}/>{survey.length?survey[0].Option1.OptionValue[1]:''}
                    </label>
                </div>
              </div>

              {question2 ?
                <div className="checkboxes">
                  <p className='survey-question'>{survey.length?survey[1].Question:'Loadin Question'}</p>
                  <div className='checkbox-data'>
                    <label class="checkbox-inline lable-text ">
                      <input type="checkbox" value={survey.length?survey[1].Option1.OptionValue[0]:''} checked={question2check == 'YES'} onChange={(event) =>handleradioleChange(2,'case3',event)} /> {survey.length?survey[1].Option1.OptionValue[0]:''}
                 </label>

                    <label class="checkbox-inline">
                      <input type="checkbox" value={survey.length?survey[1].Option1.OptionValue[1]:''} checked={question2check == 'NO'} onChange={(event) =>handleradioleChange(2,'case8',event)} />{survey.length?survey[1].Option1.OptionValue[1]:''}
                 </label>
                  </div>
                </div>:
                ''
              }
             

            {question3?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[2].Question : 'Loading Question'}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value={survey.length?survey[2].Option1.OptionValue[0]:''} checked={question3check == 'YES'} onChange={(event) =>handleradioleChange(3,'case4', event)}  /> {survey.length?survey[2].Option1.OptionValue[0]:''}
                </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" value={survey.length?survey[2].Option1.OptionValue[1]:''} checked={question3check == 'NO'} onChange={(event) =>handleradioleChange(3, 'case5', event)} />{survey.length?survey[2].Option1.OptionValue[1]:''}
               </label>
                </div>
              </div>:
              ''
              }

            {question4?
              <div className="checkboxes survey-complaint">
                <p className='survey-question'>{survey.length ? survey[3].Question : 'Loading Question'}</p>
                <div className='checkbox-data'>
                  <label class="checkbox-inline lable-text ">
                    <input type="checkbox" value={survey.length?survey[3].Option1.OptionValue[0]:''} checked={question4check == 'YES'} onChange={(event) =>handleradioleChange(4,'case6', event)}  /> {survey.length?survey[3].Option1.OptionValue[0]:''}
                </label>

                  <label class="checkbox-inline">
                    <input type="checkbox" value={survey.length?survey[3].Option1.OptionValue[1]:''} checked={question4check == 'NO'} onChange={(event) =>handleradioleChange(4, 'case7', event)} />{survey.length?survey[3].Option1.OptionValue[1]:''}
               </label>
                </div>
              </div>:
              ''
              }

            <div className='survey-btn'>
              <a class="button is-primary" onClick = {onSubmit}><span className='btn-angle-down'><i class="fas fa-angle-down" ></i></span>SUBMIT</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state)(SurveyCard )
