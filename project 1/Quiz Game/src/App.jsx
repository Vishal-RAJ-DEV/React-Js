import { useState, useEffect } from 'react'

function App() {
  const [token, setToken] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state to handle finish
  const [score, setScore] = useState(0);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenResponse = await fetch("https://opentdb.com/api_token.php?command=request");
        const tokenData = await tokenResponse.json();
        setToken(tokenData.token);
        sessionStorage.setItem('quizToken', tokenData.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const storedToken = sessionStorage.getItem('quizToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Check sessionStorage first
        const storedData = sessionStorage.getItem('quizData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setQuizData(parsedData);
          console.log('Using stored data:', parsedData);
          return;
        }

        // Fetch new data with token
        const response = await fetch(`https://opentdb.com/api.php?amount=50&category=18&type=multiple&token=${token}`);
        const data = await response.json();
        
        console.log('API Response:', data);

        if (data.response_code === 0) {
          setQuizData(data.results);
          sessionStorage.setItem('quizData', JSON.stringify(data.results));
        } else {
          console.error('API Error Code:', data.response_code);
        }
      } catch(error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]); // Add token as dependency

  // suffule the answers to randomize the order of the answers 
  useEffect(() => {
    if (quizData && quizData[currentQuestion]) {
      const answers = [...quizData[currentQuestion].incorrect_answers, quizData[currentQuestion].correct_answer]
        .sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [currentQuestion, quizData]);  // this is the function for suffling the answers 

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResults(true);
    if (answer === quizData[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {   // this is the function for next question 
    if (currentQuestion >= 49) {  // if the current question is greater than or eu
      setIsFinished(true);
      return;
    }
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResults(false);
  };

  const getAnswerStyle = (option) => {   // this is the function for detemining the style of the answer
    if (!showResults) {
      return 'border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50';
    }
    
    if (option === quizData[currentQuestion].correct_answer) {
      return 'bg-green-100 border-green-500 hover:bg-green-200 hover:border-green-600';
    }
    
    if (selectedAnswer === option && option !== quizData[currentQuestion].correct_answer) {
      return 'bg-red-100 border-red-500 hover:bg-red-200 hover:border-red-600';
    }
    
    return 'border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50';
  };

  return ( //
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-600 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        {isFinished ? (   // this is the function for the finish screen 
          // Results Screen
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Quiz Completed! 🎉</h2>
            <div className="bg-indigo-50 rounded-lg p-6 mb-6">
              <p className="text-2xl font-bold text-indigo-600 mb-2">Your Score</p>
              <p className="text-4xl font-bold text-indigo-700">{score} / 50</p>
              <p className="text-xl text-indigo-600 mt-2">
                ({((score / 50) * 100).toFixed(1)}%)
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold
                hover:bg-indigo-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>  //quiz game screen 
            {/* Quiz Header */}
            <p className="text-3xl font-bold text-center text-gray-800 mb-4">Quiz Game</p>
            <hr className="border-gray-200 mb-6" />

            {/* Question Section */}
            {quizData && quizData[currentQuestion] && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{ __html: quizData[currentQuestion].question }}>
                </h2>

                {/* Options List */}
                <ul className="space-y-3">
                  {shuffledAnswers.map((option, index) => (
                    <li key={index} className="transform transition-all duration-200 hover:-translate-y-1">
                      <div className='flex items-center'>
                        <span className='flex border-2 px-4 py-3 mr-4 rounded-2xl border-indigo-400 text-center text-indigo-900'>
                          {index + 1}
                        </span>
                        <button 
                          className={`w-full text-left px-6 py-3 rounded-lg border-2 
                            ${getAnswerStyle(option)}
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showResults}  // disable button after selection 
                          dangerouslySetInnerHTML={{ __html: option }}>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button 
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold
                  hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto"
                onClick={handleNext}
                disabled={!selectedAnswer || currentQuestion >= 49}>
                {currentQuestion >= 49 ? 'Finish' : 'Next Question'}
              </button>
              <div className="text-gray-600 font-medium">
                Question {currentQuestion + 1} of 50
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App