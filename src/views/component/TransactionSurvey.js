import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import transactionValidation from '../../utils/transactionValidation'
import '../../styles/surveycard.css'
import { SelectedReason } from '../../redux/actions/notification/notification'
import { authRoutes } from '../../utils/Common'
import { set } from 'mongoose'
import is from 'is_js'

const SurveyCard = (props) => {
  let [survey, setSurvey] = useState([])
  let [name, setName] = useState('')
  let [promotionFeedback, setPromotionFeedback] = useState('')
  let [directFeedbackMessage, setDirectFeedbackMessage] = useState('')
  let [question1check, setQuestion1check] = useState('')
  let [question1, setQuestion1] = useState('')
  let [question2, setQuestion2] = useState('')
  let [question2check, setQuestion2check] = useState('')
  let [question3, setQuestion3] = useState()
  let [question3check, setQuestion3check] = useState('')
  let [question4, setQuestion4] = useState()
  let [question4check, setQuestion4check] = useState('')
  let [question6check, setQuestion6check] = useState('')
  let [question5, setQuestion5] = useState()
  let [question5check, setQuestion5check] = useState('')
  let [promotionField, setPromotionField] = useState('')
  let [directFeedback, setDirectFeedback] = useState('')
  let [loader, setLoader] = useState(false)
  let [errorMsg, setErrorMsg] = useState('')
  let [Errors, setErrors] = useState({})
  let [successMsg, setSuccessMsg] = useState('')

  let [Question1Res, setQuestion1Res] = useState('')
  let [Question2Res, setQuestion2Res] = useState('')
  let [Question3Res, setQuestion3Res] = useState('')
  let [Question4Res, setQuestion4Res] = useState('')
  let [Question5Res, setQuestion5Res] = useState('')
  let [Question6Res, setQuestion6Res] = useState('')

  let showQuestions = (Case) => {
    switch (Case) {
      case 'case1':
        setQuestion4(false)
        setQuestion1(true)
        break
      case 'case2':
        setQuestion2(true)
        setQuestion5(false)
        setQuestion4(false)
        setPromotionField(false)
        setDirectFeedback(false)
        break
      case 'case3':
        setQuestion3(true)
        setPromotionField(false)
        break
      case 'case5':
        setQuestion4(false)
        setQuestion5(true)
        setQuestion2(false)
        setPromotionField(false)
        break
      case 'case6':
        setQuestion5(true)
        setQuestion3(true)
        break
      case 'case7':
        setQuestion5(false)
        setQuestion3(false)
        setQuestion4(true)
        setPromotionField(false)
        setDirectFeedback(false)
        break
      case 'promotionField':
        setQuestion3(false)
        setPromotionField(true)
        setQuestion4(false)
        setDirectFeedback(false)
        break;
      case 'directFeedback':
        setDirectFeedback(true)
        setQuestion5(false)
        setQuestion4(false)
        setPromotionField(false)
        break
      case 'case4':
        setQuestion4(true)
        setQuestion1(false)
        setQuestion2(false)
        setQuestion5(false)
        setQuestion3(false)
        setPromotionField(false)
        setDirectFeedback(false)
        break
    }
  }

  let optionCheck = (index, val) => {
    switch (index) {
      case 1:
        setQuestion1Res(survey[0].Question)
        setQuestion1check(val)
        break
      case 2:
        setQuestion2Res(survey[1].Question)
        setQuestion2check(val)
        break
      case 3:
        setQuestion3Res(survey[2].Question)
        setQuestion3check(val)
        break
      case 4:
        setQuestion5Res(survey[4].Question)
        setQuestion4check(val)
        break
      case 5:
        setQuestion6Res(survey[5].Question)
        setQuestion5check(val)
        break
      case 6:
        setQuestion4Res(survey[3].Question)
        setQuestion6check(val)
        break
    }
  }

  let handleradioleChange = (index, Case, e) => {
    let val = e.target.value
    showQuestions(Case)
    optionCheck(index, val)
  }

  useEffect(() => {
    authRoutes(props)
    let user = JSON.parse(localStorage.getItem('user'))
    const { Type = '' } = user || {}
    setLoader(true)
    axios.get(`http://3.83.23.220:7788/gettransactionsurvey`)
      .then(res => {
        let { data = [] } = res
        console.log('data ==>', data)
        setSurvey(data)
        setLoader(false)
      })
    if (Type !== 'user') {
      props.history.push('/contact')
    }
  }, [])

  let onSubmit = () => {
    setTimeout(() => {
      setErrorMsg('')
    }, 2000)

    if (question1check === '') {
      setErrorMsg('Please select checkbox')
      return
    }

    if (question1check === 'YES') {
      if (question2check === '') {
        setErrorMsg('Please select checkbox')
        return
      }
      if (question2check === 'YES') {
        if (question3check === '') {
          setErrorMsg('Please select checkbox')
          return
        }

        if (question3check === 'YES') {
          const errors = transactionValidation({ name, promotionFeedback })
          if (!is.empty(errors)) {
            setErrors(errors)
            return
          }
        }

        if (question3check === 'NO') {
          if (question6check === '') {
            setErrorMsg('Please select checkbox')
            return
          }
        }
      }

      if (question2check == 'NO') {
        if (question5check === '') {
          setErrorMsg('Please select checkbox')
          return
        }
      }
    }

    if (question1check === 'NO') {
      if (question4check === '') {
        setErrorMsg('Please select checkbox')
        return
      }
    }

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
    let Question5Response = {
      question: Question5Res,
      answer: question4check
    }
    let Question6Response = {
      question: Question6Res,
      answer: question4check
    }

    if (question5check == 'YES' || question4check == 'YES') {
      props.dispatch(SelectedReason('transactionsurvey'))
      props.history.push('/contact/3')
    }

    // axios.post(`http://localhost:7777/transactionSurveyResponse`, {Question1Response, Question2Response,
    // Question3Response, Question4Response})
    //   .then(res => {
    //     if(res.status='200'){

    //     }
    //     console.log("response ===???", res)
    //   })
    // const errors = transactionValidation({name, promotionFeedback})
    // if (!is.empty(errors)) {
    //   setErrors(errors)
    //   return
    // }
    setSuccessMsg('Data saved successfully')
    setTimeout(() => {
      setSuccessMsg('')
    }, 5000)
  }

  let nameChagneHandle = (e) => {
    setName(e.target.value)
  }

  let promotionChangeHandler = (e) => {
    setPromotionFeedback(e.target.value)
  }

  let directFeedbackHandler = (e) => {
    setDirectFeedbackMessage(e.target.value)
  }

  return (
    <div className='transaction-survey'>
      <div className='row'>
        <div className='survey-card'>
          <div class='surveycard'>
            <div className='card-header '>
              <p className='card-header-title card-heading '> <i class='fas fa-cog' />Transaction Survey</p>
            </div>
            {
              loader ? <div class='survey-loading'>
                <img src={require('../../images/loader.gif')} />
              </div> : ''
            }
            <div className='checkboxes'>
              <p className='survey-question'>{survey.length ? survey[0].Question : ''}</p>
              <div className='checkbox-data'>
                <label class='checkbox-inline lable-text '>
                  <input type='checkbox' value={survey.length ? survey[0].Option1.OptionValue[0] : ''} checked={question1check == 'YES'} onChange={(event) => handleradioleChange(1, 'case1', event)} />  {survey.length ? survey[0].Option1.OptionValue[0] : ''}
                </label>

                <label class='checkbox-inline'>
                  <input type='checkbox' value={survey.length ? survey[0].Option1.OptionValue[1] : ''} checked={question1check == 'NO'} onChange={(event) => handleradioleChange(1, 'case4', event)} /> {survey.length ? survey[0].Option1.OptionValue[1] : ''}
                </label>
              </div>
            </div>
            {question1
              ? <div className='checkboxes'>
                <p className='survey-question'>{survey.length ? survey[1].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class='checkbox-inline lable-text '>
                    <input type='checkbox' value={survey.length ? survey[1].Option1.OptionValue[0] : ''} checked={question2check == 'YES'} onChange={(event) => handleradioleChange(2, 'case2', event)} /> {survey.length ? survey[1].Option1.OptionValue[0] : ''}
                  </label>

                  <label class='checkbox-inline'>
                    <input type='checkbox' checked={question2check == 'NO'} value={survey.length ? survey[1].Option1.OptionValue[1] : ''} onChange={(event) => handleradioleChange(2, 'case5', event)} />{survey.length ? survey[1].Option1.OptionValue[1] : ''}
                  </label>
                </div>
              </div>
              : ''}
            {question2
              ? <div className='checkboxes survey-complaint'>
                <p className='survey-question'>{survey.length ? survey[2].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class='checkbox-inline lable-text '>
                    <input type='checkbox' value={survey.length ? survey[2].Option1.OptionValue[0] : ''} checked={question3check == 'YES'} onChange={(event) => handleradioleChange(3, 'promotionField', event)} /> {survey.length ? survey[2].Option1.OptionValue[0] : ''}
                  </label>
                  <label class='checkbox-inline'>
                    <input type='checkbox'checked={question3check == 'NO'} value={survey.length ? survey[2].Option1.OptionValue[1] : ''} onChange={(event) => handleradioleChange(3, 'case3', event)} />{survey.length ? survey[2].Option1.OptionValue[1] : ''}
                  </label>
                </div>
              </div>
              : ''}
            {promotionField
              ? <div className='checkboxes survey-complaint'>
                <div class='field address'>
                  <p class='control has-icons-left'>
                    <input class='input' type='text' placeholder='Name' onChange={nameChagneHandle} />
                    <p className='error-message-text'>{(Errors.name && Errors.name[0]) || ''}</p>
                    <span class='icon is-small is-left'>
                      <i class='fas fa-address-card' />
                    </span>
                  </p>
                </div>
                <div class='field address'>
                  <div class='control'>
                    <textarea class='textarea' placeholder='Input any complimentary comment(s) here' onChange={promotionChangeHandler} />
                  </div>
                  <p className='error-message-text'>{(Errors.promotionFeedback && Errors.promotionFeedback[0]) || ''}</p>
                  <p className='reminder-msg'><strong>IMPORTANT REMINDER:</strong>By inputting any comment(s) in this section, you are agreeing to allow said comments
            to be used for promotional purposes publicly. That said, if you would like your comment(s) to stay private please change the
            previous answer to NO and provide direct feedback in the question below.</p>
                </div>
              </div>
              : ''}
            {question5
              ? <div className='checkboxes survey-complaint'>
                <p className='survey-question'>{survey.length ? survey[5].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class='checkbox-inline lable-text '>
                    <input type='checkbox' value={survey.length ? survey[5].Option1.OptionValue[0] : ''} checked={question5check == 'YES'} onChange={(event) => handleradioleChange(5, 'complaint', event)} /> {survey.length ? survey[5].Option1.OptionValue[0] : ''}
                  </label>

                  <label class='checkbox-inline'>
                    <input type='checkbox' value={survey.length ? survey[5].Option1.OptionValue[1] : ''} checked={question5check == 'NO'} onChange={(event) => handleradioleChange(5, 'end', event)} />{survey.length ? survey[5].Option1.OptionValue[1] : ''}
                  </label>
                </div>
              </div>
              : ''}
            {question3
              ? <div className='checkboxes survey-complaint'>
                <p className='survey-question'>{survey.length ? survey[3].Question : ''}</p>
                <div className='checkbox-data'>
                  <label class='checkbox-inline lable-text '>
                    <input type='checkbox' value={survey.length ? survey[3].Option1.OptionValue[0] : ''} checked={question6check == 'YES'} onChange={(event) => handleradioleChange(6, 'directFeedback', event)} /> {survey.length ? survey[3].Option1.OptionValue[0] : ''}
                  </label>

                  <label class='checkbox-inline'>
                    <input type='checkbox' value={survey.length ? survey[3].Option1.OptionValue[1] : ''} checked={question6check == 'NO'} onChange={(event) => handleradioleChange(6, 'end', event)} />{survey.length ? survey[3].Option1.OptionValue[1] : ''}
                  </label>
                </div>
              </div>
              : ''}
            {directFeedback
              ? <div className='checkboxes survey-complaint'>
                <div class='field address'>
                  <div class='control'>
                    <textarea class='textarea' required placeholder='Provide any feedback here' onChange={directFeedbackHandler} />
                  </div>
                  <p className='reminder-msg'><strong>IMPORTANT REMINDER:</strong>Any feedback provided in the section above will be considered private.
                Failure to adhere to this rule will result in status suspension or permanent account deletion.  </p>
                </div>
              </div> : ''
            }
            {question4
              ? <div>
                <div className='checkboxes'>
                  <p className='survey-question'>{survey.length ? survey[4].Question : ''}</p>
                  <div className='checkbox-data'>
                    <label class='checkbox-inline lable-text '>
                      <input type='checkbox' value={survey.length ? survey[4].Option1.OptionValue[0] : ''} checked={question4check == 'YES'} onChange={(event) => handleradioleChange(4, 'case10', event)} /> {survey.length ? survey[4].Option1.OptionValue[0] : ''}
                    </label>

                    <label class='checkbox-inline'>
                      <input type='checkbox' value={survey.length ? survey[4].Option1.OptionValue[1] : ''} checked={question4check == 'NO'} onChange={(event) => handleradioleChange(4, 'case11', event)} />{survey.length ? survey[4].Option1.OptionValue[1] : ''}
                    </label>
                  </div>
                </div>
              </div> : ''
            }
            <p className='error-Msg'>{errorMsg}</p>
            <div className='survey-btn'>
              <a class='button is-primary' onClick={onSubmit}><span className='btn-angle-down'><i class='fas fa-angle-down' /></span>SUBMIT</a>
            </div>
            <p className='send-success-msg'>{successMsg}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(state => state)(SurveyCard)
