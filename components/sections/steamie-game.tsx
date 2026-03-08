"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Shield, Trophy, ArrowLeft, Home, Star, Lock, Mail, MessageSquare, AlertTriangle } from "lucide-react"

type GameScreen = "intro" | "game" | "complete"
type AstraState = "guide" | "correcto" | "error"

interface FeedbackState {
  show: boolean
  correct: boolean
  message: string
}

const TOTAL_LEVELS = 5

const levelTitles = [
  "Detecta el phishing",
  "Crea una contraseña segura",
  "Protege tu identidad",
  "Redes sociales seguras",
  "El hacker misterioso"
]

export default function STEAMieGame() {
  const [screen, setScreen] = useState<GameScreen>("intro")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [astraState, setAstraState] = useState<AstraState>("guide")
  const [feedback, setFeedback] = useState<FeedbackState>({ show: false, correct: false, message: "" })

  const getAstraImage = () => {
    switch (astraState) {
      case "correcto":
        return "/astra-correcto.png"
      case "error":
        return "/astra-error.png"
      default:
        return "/astra.png"
    }
  }

  const handleCorrectAnswer = useCallback((message: string = "¡Excelente! Has protegido la información.") => {
    setAstraState("correcto")
    setScore(prev => prev + 10)
    setFeedback({ show: true, correct: true, message })
    
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: "" })
      setAstraState("guide")
      if (currentLevel < TOTAL_LEVELS) {
        setCompletedLevels(prev => [...prev, currentLevel])
        setCurrentLevel(prev => prev + 1)
      } else {
        setCompletedLevels(prev => [...prev, currentLevel])
        setScreen("complete")
      }
    }, 2000)
  }, [currentLevel])

  const handleIncorrectAnswer = useCallback((message: string) => {
    setAstraState("error")
    setFeedback({ show: true, correct: false, message: message + " ¡Intenta de nuevo!" })
    
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: "" })
      setAstraState("guide")
    }, 3000)
  }, [])

  const resetGame = () => {
    setScreen("intro")
    setCurrentLevel(1)
    setScore(0)
    setCompletedLevels([])
    setAstraState("guide")
    setFeedback({ show: false, correct: false, message: "" })
  }

  const goToMenu = () => {
    setScreen("intro")
    setAstraState("guide")
    setFeedback({ show: false, correct: false, message: "" })
  }

  // Intro Screen
  if (screen === "intro") {
    return (
      <div id="juego" className="min-h-screen bg-[#FFF3F0] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#9046CF] to-[#CC59D2] text-white px-6 py-3 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8" />
              <span className="text-2xl font-bold">STEAMie</span>
            </div>
          </div>

          {/* ASTRA and Speech Bubble */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border-2 border-[#CC59D2] max-w-lg">
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white"></div>
              <p className="text-[#2D1B4E] text-lg leading-relaxed text-center">
                Internet está lleno de retos y peligros ocultos. Para convertirte en un <strong className="text-[#9046CF]">STEAMie</strong> debes completar <strong className="text-[#CC59D2]">5 misiones</strong> de seguridad digital.
              </p>
              <p className="text-[#9046CF] font-semibold mt-4 text-center">
                ASTRA será tu guía en cada nivel.
              </p>
            </div>
            
            <div className="w-72 h-72 md:w-80 md:h-80 relative">
              <Image 
                src="/astra.png" 
                alt="ASTRA - Tu guía STEAMie" 
                width={320} 
                height={320}
                className="object-contain w-full h-full drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => setScreen("game")}
              className="group relative bg-gradient-to-r from-[#F487B6] via-[#CC59D2] to-[#9046CF] hover:from-[#F9A8C9] hover:via-[#D87BD9] hover:to-[#A55ED6] text-white text-xl font-bold px-12 py-5 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </span>
                Comenzar entrenamiento
              </span>
            </button>
          </div>

          {/* Mission Preview */}
          <div className="mt-12 grid grid-cols-5 gap-2">
            {levelTitles.map((title, index) => (
              <div 
                key={index}
                className="bg-white/60 rounded-xl p-3 text-center border border-[#E8D4F0]"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#9046CF] to-[#CC59D2] flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <p className="text-xs text-[#6B4D8A] font-medium leading-tight">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Complete Screen
  if (screen === "complete") {
    return (
      <div className="min-h-screen bg-[#FFF3F0] flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          {/* Badge */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#FDE12D] to-[#F487B6] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="w-40 h-40 bg-gradient-to-br from-[#9046CF] to-[#CC59D2] rounded-full flex items-center justify-center">
                  <Trophy className="w-20 h-20 text-[#FDE12D]" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Star className="w-12 h-12 text-[#FDE12D] fill-[#FDE12D]" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#9046CF] mb-4">
            Entrenamiento completado
          </h1>
          
          <div className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] text-white px-8 py-4 rounded-full inline-block mb-6 shadow-lg">
            <span className="text-2xl font-bold">Ahora eres una STEAMie legendaria</span>
          </div>

          {/* ASTRA Message */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-[#CC59D2] mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
              <div className="w-40 h-40 shrink-0">
                <Image 
                  src="/astra-correcto.png" 
                  alt="ASTRA celebrando" 
                  width={160} 
                  height={160}
                  className="object-contain w-full h-full drop-shadow-xl"
                />
              </div>
              <p className="text-[#2D1B4E] text-xl text-center sm:text-left">
                ¡Felicidades! Has completado el entrenamiento basico de ciberseguridad.
              </p>
            </div>
          </div>

          {/* Final Score */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#E8D4F0]">
            <p className="text-[#6B4D8A] mb-2">Tu puntuación</p>
            <p className="text-5xl font-bold text-[#9046CF]">{score}</p>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-[#FDE12D] fill-[#FDE12D]" />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-white border-2 border-[#9046CF] text-[#9046CF] hover:bg-[#9046CF] hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </button>
            <button
              onClick={() => {
                setCurrentLevel(1)
                setScore(0)
                setCompletedLevels([])
                setScreen("game")
              }}
              className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] hover:from-[#7D3BB8] hover:to-[#B84DC0] text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Repetir misiones
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Game Screen
  return (
    <div className="min-h-screen bg-[#FFF3F0] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-[#E8D4F0] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToMenu}
                className="flex items-center gap-1 text-[#6B4D8A] hover:text-[#9046CF] transition-colors px-3 py-2 rounded-lg hover:bg-[#F8E8F4]"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Volver al menú</span>
              </button>
              <button
                onClick={resetGame}
                className="flex items-center gap-1 text-[#6B4D8A] hover:text-[#E74C3C] transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Salir</span>
              </button>
            </div>

            {/* Level Indicator */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#9046CF] to-[#CC59D2] text-white px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="font-bold text-sm">Nivel {currentLevel}</span>
            </div>

{/* Score */}
          <div className="flex items-center gap-2 bg-[#F8E8F4] px-4 py-2 rounded-full font-bold">
            <Star className="w-5 h-5 fill-[#FDE12D] text-[#FDE12D]" />
            <span className="text-[#9046CF]">{score}</span>
          </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-[#6B4D8A]">Progreso de misiones</span>
              <span className="text-xs text-[#9046CF] font-bold">{completedLevels.length}/{TOTAL_LEVELS}</span>
            </div>
            <div className="h-3 bg-[#E8D4F0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#9046CF] to-[#CC59D2] transition-all duration-500 rounded-full"
                style={{ width: `${(completedLevels.length / TOTAL_LEVELS) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {levelTitles.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${completedLevels.includes(index + 1) 
                      ? 'bg-[#27AE60] text-white' 
                      : currentLevel === index + 1 
                        ? 'bg-[#9046CF] text-white ring-4 ring-[#CC59D2]/30' 
                        : 'bg-[#E8D4F0] text-[#6B4D8A]'
                    }`}
                >
                  {completedLevels.includes(index + 1) ? '✓' : index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {/* Level Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#9046CF]">
              Nivel {currentLevel}: {levelTitles[currentLevel - 1]}
            </h2>
          </div>

          {/* ASTRA Guide Section */}
          <div className="flex flex-col md:flex-row items-start gap-4 mb-8">
            <div className="shrink-0 mx-auto md:mx-0">
              <div className={`w-40 h-40 md:w-48 md:h-48 relative transition-all duration-300 ${astraState === 'correcto' ? 'scale-110' : astraState === 'error' ? 'scale-95' : ''}`}>
                <Image 
                  src={getAstraImage()} 
                  alt="ASTRA" 
                  width={192} 
                  height={192}
                  className="object-contain w-full h-full drop-shadow-2xl"
                />
              </div>
            </div>
            
            <div className={`flex-1 rounded-2xl p-5 shadow-lg border-2 transition-all duration-300
              ${feedback.show 
                ? feedback.correct 
                  ? 'bg-green-50 border-[#27AE60]' 
                  : 'bg-red-50 border-[#E74C3C]'
                : 'bg-white border-[#CC59D2]'
              }`}
            >
              {feedback.show ? (
                <p className={`text-lg font-medium ${feedback.correct ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                  {feedback.message}
                </p>
              ) : (
                <AstraMessage level={currentLevel} />
              )}
            </div>
          </div>

          {/* Game Content */}
          {!feedback.show && (
            <LevelContent 
              level={currentLevel} 
              onCorrect={handleCorrectAnswer}
              onIncorrect={handleIncorrectAnswer}
            />
          )}
        </div>
      </main>
    </div>
  )
}

function AstraMessage({ level }: { level: number }) {
  const messages: Record<number, string> = {
    1: "Los hackers usan correos falsos para engañar a las personas. Observa el mensaje y decide si es seguro o phishing.",
    2: "Las contraseñas fuertes protegen tu información. Construye una contraseña combinando palabras, números y símbolos.",
    3: "No toda la información debe compartirse en internet. Clasifica qué datos son seguros de compartir y cuáles son privados.",
    4: "En redes sociales algunas personas pueden intentar engañarte. ¿Qué harías con este mensaje sospechoso?",
    5: "Un hacker está enviando mensajes sospechosos. Ayuda a descubrir cuál es el intento de phishing."
  }
  
  return <p className="text-[#2D1B4E] text-lg">{messages[level]}</p>
}

interface LevelContentProps {
  level: number
  onCorrect: (message?: string) => void
  onIncorrect: (message: string) => void
}

function LevelContent({ level, onCorrect, onIncorrect }: LevelContentProps) {
  switch (level) {
    case 1:
      return <Level1Phishing onCorrect={onCorrect} onIncorrect={onIncorrect} />
    case 2:
      return <Level2Password onCorrect={onCorrect} onIncorrect={onIncorrect} />
    case 3:
      return <Level3Identity onCorrect={onCorrect} onIncorrect={onIncorrect} />
    case 4:
      return <Level4SocialMedia onCorrect={onCorrect} onIncorrect={onIncorrect} />
    case 5:
      return <Level5HackerMisterioso onCorrect={onCorrect} onIncorrect={onIncorrect} />
    default:
      return null
  }
}

// Level 1: Phishing Detection
function Level1Phishing({ onCorrect, onIncorrect }: { onCorrect: () => void, onIncorrect: (msg: string) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8D4F0]">
      {/* Fake Email */}
      <div className="bg-[#F8E8F4] px-6 py-4 border-b border-[#E8D4F0]">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-[#9046CF]" />
          <span className="font-bold text-[#2D1B4E]">Bandeja de entrada</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="border border-[#E8D4F0] rounded-xl p-5 mb-6 bg-[#FFFBFA]">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-bold text-[#2D1B4E]">De: <span className="font-mono text-sm bg-[#F8E8F4] px-1 rounded">soporte@banc0-segur0.com</span></p>
              <p className="text-sm text-[#6B4D8A]">Asunto: ¡URGENTE! Tu cuenta será bloqueada</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-[#E8D4F0]">
            <p className="text-[#2D1B4E] mb-3">
              Estimado usuario,
            </p>
            <p className="text-[#2D1B4E] mb-3">
              Hemos detectado actividad sospechosa en tu cuenta. Si no verificas tu información en las próximas 24 horas, 
              tu cuenta será <strong className="text-red-500">BLOQUEADA PERMANENTEMENTE</strong>.
            </p>
            <p className="text-[#2D1B4E] mb-4">
              Haz clic aquí para verificar: <span className="font-mono text-sm text-blue-500 underline bg-blue-50 px-1 rounded">www.banc0-segur0-verificar.com/login</span>
            </p>
            <p className="text-[#6B4D8A] text-sm">
              Atentamente,<br/>
              Equipo de Seguridad
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onIncorrect("¡Cuidado! Este correo tiene señales de phishing: dirección sospechosa (banc0 con ceros), urgencia excesiva y enlaces extraños. Nunca hagas clic en estos enlaces.")}
            className="flex-1 bg-green-100 hover:bg-green-200 border-2 border-green-400 text-green-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            Correo seguro
          </button>
          <button
            onClick={() => onCorrect("¡Muy bien! Identificaste las señales de phishing: errores en el remitente, urgencia falsa y enlaces sospechosos.")}
            className="flex-1 bg-red-100 hover:bg-red-200 border-2 border-red-400 text-red-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            Intento de phishing
          </button>
        </div>
      </div>
    </div>
  )
}

// Level 2: Password Creation
function Level2Password({ onCorrect, onIncorrect }: { onCorrect: () => void, onIncorrect: (msg: string) => void }) {
  const [password, setPassword] = useState<string[]>([])
  const [availableElements] = useState([
    { id: "word1", value: "Sol", type: "word" },
    { id: "word2", value: "Luna", type: "word" },
    { id: "num1", value: "2024", type: "number" },
    { id: "num2", value: "42", type: "number" },
    { id: "sym1", value: "@", type: "symbol" },
    { id: "sym2", value: "#", type: "symbol" },
    { id: "sym3", value: "!", type: "symbol" },
  ])

  const getStrength = (): { level: string, color: string, width: string } => {
    const hasWord = password.some(p => availableElements.find(e => e.value === p)?.type === "word")
    const hasNumber = password.some(p => availableElements.find(e => e.value === p)?.type === "number")
    const hasSymbol = password.some(p => availableElements.find(e => e.value === p)?.type === "symbol")
    const length = password.join("").length

    if (hasWord && hasNumber && hasSymbol && length >= 8) {
      return { level: "Fuerte", color: "bg-[#27AE60]", width: "100%" }
    } else if ((hasWord && hasNumber) || (hasWord && hasSymbol) || (hasNumber && hasSymbol)) {
      return { level: "Media", color: "bg-[#FDE12D]", width: "60%" }
    }
    return { level: "Débil", color: "bg-[#E74C3C]", width: "30%" }
  }

  const strength = getStrength()

  const addToPassword = (value: string) => {
    if (password.length < 4) {
      setPassword([...password, value])
    }
  }

  const removeFromPassword = (index: number) => {
    setPassword(password.filter((_, i) => i !== index))
  }

  const checkPassword = () => {
    if (strength.level === "Fuerte") {
      onCorrect("¡Perfecto! Has creado una contraseña fuerte combinando palabras, números y símbolos.")
    } else if (strength.level === "Media") {
      onIncorrect("Tu contraseña es media. Intenta agregar más variedad: palabras, números Y símbolos para hacerla más fuerte.")
    } else {
      onIncorrect("Tu contraseña es débil. Necesitas combinar al menos una palabra, un número y un símbolo.")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E8D4F0]">
      {/* Password Display */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#6B4D8A] mb-2">Tu contraseña:</label>
        <div className="min-h-16 bg-[#F8E8F4] rounded-xl p-4 flex flex-wrap items-center gap-2 border-2 border-dashed border-[#CC59D2]">
          {password.length === 0 ? (
            <span className="text-[#6B4D8A]">Arrastra elementos aquí...</span>
          ) : (
            password.map((p, index) => (
              <button
                key={index}
                onClick={() => removeFromPassword(index)}
                className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] text-white px-4 py-2 rounded-lg font-bold hover:opacity-80 transition-opacity"
              >
                {p} ✕
              </button>
            ))
          )}
        </div>
        <p className="text-xs text-[#6B4D8A] mt-2">Haz clic en un elemento del password para eliminarlo</p>
      </div>

      {/* Strength Indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#6B4D8A]">Fortaleza:</span>
          <span className={`font-bold ${strength.level === 'Fuerte' ? 'text-[#27AE60]' : strength.level === 'Media' ? 'text-[#B8860B]' : 'text-[#E74C3C]'}`}>
            {strength.level}
          </span>
        </div>
        <div className="h-4 bg-[#E8D4F0] rounded-full overflow-hidden">
          <div 
            className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
            style={{ width: strength.width }}
          />
        </div>
      </div>

      {/* Elements to drag */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#6B4D8A] mb-3">Haz clic para agregar elementos:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {availableElements.map((element) => (
            <button
              key={element.id}
              onClick={() => addToPassword(element.value)}
              disabled={password.length >= 4}
              className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 border-2
                ${element.type === 'word' ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' :
                  element.type === 'number' ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' :
                  'bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-200'}
                ${password.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
              `}
            >
              {element.value}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-[#6B4D8A]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-300 rounded"></span> Palabras</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-300 rounded"></span> Números</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-300 rounded"></span> Símbolos</span>
        </div>
      </div>

      {/* Check Button */}
      <button
        onClick={checkPassword}
        disabled={password.length === 0}
        className="w-full bg-gradient-to-r from-[#9046CF] to-[#CC59D2] hover:from-[#7D3BB8] hover:to-[#B84DC0] text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-5 h-5 inline mr-2" />
        Verificar contraseña
      </button>
    </div>
  )
}

// Level 3: Identity Protection
function Level3Identity({ onCorrect, onIncorrect }: { onCorrect: () => void, onIncorrect: (msg: string) => void }) {
  const [cards] = useState([
    { id: 1, text: "Dirección", isPrivate: true },
    { id: 2, text: "Número de teléfono", isPrivate: true },
    { id: 3, text: "Nombre del colegio", isPrivate: true },
    { id: 4, text: "Juego favorito", isPrivate: false },
    { id: 5, text: "Foto de mascota", isPrivate: false },
  ])
  
  const [safeCards, setSafeCards] = useState<number[]>([])
  const [privateCards, setPrivateCards] = useState<number[]>([])
  const [remainingCards, setRemainingCards] = useState(cards.map(c => c.id))

  const moveCard = (cardId: number, destination: 'safe' | 'private') => {
    setRemainingCards(prev => prev.filter(id => id !== cardId))
    if (destination === 'safe') {
      setSafeCards(prev => [...prev, cardId])
      setPrivateCards(prev => prev.filter(id => id !== cardId))
    } else {
      setPrivateCards(prev => [...prev, cardId])
      setSafeCards(prev => prev.filter(id => id !== cardId))
    }
  }

  const checkAnswers = () => {
    const allCorrect = cards.every(card => {
      if (card.isPrivate) {
        return privateCards.includes(card.id)
      } else {
        return safeCards.includes(card.id)
      }
    })

    if (allCorrect) {
      onCorrect("¡Excelente! Sabes identificar qué información es segura compartir y cuál debe mantenerse privada.")
    } else {
      const wrongCard = cards.find(card => {
        if (card.isPrivate && safeCards.includes(card.id)) return true
        if (!card.isPrivate && privateCards.includes(card.id)) return true
        return false
      })
      if (wrongCard) {
        onIncorrect(`"${wrongCard.text}" está en la categoría incorrecta. ${wrongCard.isPrivate ? 'Esta información es privada y podría ser usada por personas malintencionadas.' : 'Esta información es segura de compartir.'}`)
      } else {
        onIncorrect("Aún faltan tarjetas por clasificar. Arrastra todas las tarjetas a su categoría correspondiente.")
      }
    }
  }

  const getCardById = (id: number) => cards.find(c => c.id === id)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#E8D4F0]">
      {/* Remaining Cards */}
      {remainingCards.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#6B4D8A] mb-3">Tarjetas para clasificar:</label>
          <div className="flex flex-wrap gap-3">
            {remainingCards.map(cardId => {
              const card = getCardById(cardId)
              return card ? (
                <div
                  key={cardId}
                  className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] text-white px-5 py-3 rounded-xl font-medium shadow-lg"
                >
                  {card.text}
                </div>
              ) : null
            })}
          </div>
        </div>
      )}

      {/* Drop Zones */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Safe Zone */}
        <div className="border-2 border-dashed border-green-400 rounded-2xl p-4 bg-green-50 min-h-[200px]">
          <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Seguro compartir
          </h3>
          <div className="space-y-2">
            {safeCards.map(cardId => {
              const card = getCardById(cardId)
              return card ? (
                <div
                  key={cardId}
                  className="bg-white border border-green-300 text-green-700 px-4 py-2 rounded-lg font-medium flex justify-between items-center"
                >
                  {card.text}
                  <button onClick={() => {
                    setSafeCards(prev => prev.filter(id => id !== cardId))
                    setRemainingCards(prev => [...prev, cardId])
                  }} className="text-green-500 hover:text-green-700">✕</button>
                </div>
              ) : null
            })}
          </div>
          {remainingCards.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {remainingCards.map(cardId => {
                const card = getCardById(cardId)
                return card ? (
                  <button
                    key={`safe-${cardId}`}
                    onClick={() => moveCard(cardId, 'safe')}
                    className="text-xs bg-green-200 hover:bg-green-300 text-green-700 px-3 py-1 rounded-full transition-colors"
                  >
                    + {card.text}
                  </button>
                ) : null
              })}
            </div>
          )}
        </div>

        {/* Private Zone */}
        <div className="border-2 border-dashed border-red-400 rounded-2xl p-4 bg-red-50 min-h-[200px]">
          <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Información privada
          </h3>
          <div className="space-y-2">
            {privateCards.map(cardId => {
              const card = getCardById(cardId)
              return card ? (
                <div
                  key={cardId}
                  className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg font-medium flex justify-between items-center"
                >
                  {card.text}
                  <button onClick={() => {
                    setPrivateCards(prev => prev.filter(id => id !== cardId))
                    setRemainingCards(prev => [...prev, cardId])
                  }} className="text-red-500 hover:text-red-700">✕</button>
                </div>
              ) : null
            })}
          </div>
          {remainingCards.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {remainingCards.map(cardId => {
                const card = getCardById(cardId)
                return card ? (
                  <button
                    key={`private-${cardId}`}
                    onClick={() => moveCard(cardId, 'private')}
                    className="text-xs bg-red-200 hover:bg-red-300 text-red-700 px-3 py-1 rounded-full transition-colors"
                  >
                    + {card.text}
                  </button>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>

      {/* Check Button */}
      <button
        onClick={checkAnswers}
        disabled={remainingCards.length > 0}
        className="w-full bg-gradient-to-r from-[#9046CF] to-[#CC59D2] hover:from-[#7D3BB8] hover:to-[#B84DC0] text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verificar clasificación
      </button>
      {remainingCards.length > 0 && (
        <p className="text-center text-sm text-[#6B4D8A] mt-2">Clasifica todas las tarjetas para continuar</p>
      )}
    </div>
  )
}

// Level 4: Social Media Safety
function Level4SocialMedia({ onCorrect, onIncorrect }: { onCorrect: () => void, onIncorrect: (msg: string) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8D4F0]">
      {/* Social Media Header */}
      <div className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] px-6 py-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Mensajes Directos</span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Fake Message */}
        <div className="border border-[#E8D4F0] rounded-xl p-5 mb-6 bg-[#FFFBFA]">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center shrink-0 text-xl">
              👤
            </div>
            <div>
              <p className="font-bold text-[#2D1B4E]">Usuario_Misterioso_2024</p>
              <p className="text-xs text-[#6B4D8A]">Hace 2 minutos</p>
            </div>
          </div>
          
          <div className="bg-[#F8E8F4] rounded-lg p-4">
            <p className="text-[#2D1B4E]">
              ¡Hola! 👋 Soy administrador de esta red social. Hemos detectado un problema con tu cuenta y necesitamos verificarla urgentemente.
            </p>
            <p className="text-[#2D1B4E] mt-3">
              Por favor, envíame tu <strong>contraseña</strong> para poder solucionar el problema antes de que pierdas tu cuenta.
            </p>
            <p className="text-[#2D1B4E] mt-3">
              ¡Es muy urgente! ⚠️
            </p>
          </div>
        </div>

        <p className="text-center text-[#6B4D8A] mb-4 font-medium">¿Qué harías con este mensaje?</p>

        <div className="grid gap-3">
          <button
            onClick={() => onCorrect("¡Correcto! Ignorar mensajes sospechosos es una buena opción. Ningún administrador real te pedirá tu contraseña.")}
            className="w-full bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            😐 Ignorar
          </button>
          <button
            onClick={() => onCorrect("¡Excelente! Reportar es la mejor opción. Ayudas a proteger a otros usuarios de este estafador.")}
            className="w-full bg-orange-100 hover:bg-orange-200 border-2 border-orange-400 text-orange-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            🚨 Reportar
          </button>
          <button
            onClick={() => onIncorrect("¡NUNCA envíes tu contraseña! Ningún administrador real te la pedirá. Este es un intento de robar tu cuenta.")}
            className="w-full bg-red-100 hover:bg-red-200 border-2 border-red-400 text-red-700 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            🔑 Enviar contraseña
          </button>
        </div>
      </div>
    </div>
  )
}

// Level 5: Mystery Hacker
function Level5HackerMisterioso({ onCorrect, onIncorrect }: { onCorrect: () => void, onIncorrect: (msg: string) => void }) {
  const messages = [
    {
      id: 1,
      sender: "Mamá",
      preview: "¿A qué hora llegas a casa hoy? Preparé tu comida favorita 🍝",
      link: "",
      isPhishing: false,
      reason: "Este es un mensaje normal de un familiar."
    },
    {
      id: 2,
      sender: "Pr3mios_Gr4tis",
      preview: "🎉 ¡FELICIDADES! Ganaste un iPhone 15. Haz clic aquí: bit.ly/pr3mio-gr4tis",
      link: "bit.ly/pr3mio-gr4tis",
      isPhishing: true,
      reason: "Este mensaje tiene señales de phishing: nombre sospechoso, premios falsos, enlaces extraños y solicita datos personales."
    },
    {
      id: 3,
      sender: "Carlos (compañero de clase)",
      preview: "Oye, ¿hiciste la tarea de matemáticas? No entiendo el ejercicio 5 😅",
      link: "",
      isPhishing: false,
      reason: "Este es un mensaje normal de un compañero."
    },
  ]

  const [selectedId, setSelectedId] = useState<number | null>(null)

  const checkAnswer = () => {
    if (selectedId === null) return
    
    const selected = messages.find(m => m.id === selectedId)
    if (selected?.isPhishing) {
      onCorrect("¡Excelente trabajo, STEAMie! Has identificado correctamente el intento de phishing.")
    } else {
      onIncorrect(selected?.reason || "Este mensaje es seguro. Busca el que tiene señales sospechosas como premios falsos o enlaces extraños.")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8D4F0]">
      <div className="bg-gradient-to-r from-[#9046CF] to-[#CC59D2] px-6 py-4">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Detecta el mensaje peligroso</span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-[#6B4D8A] mb-4 text-center">Selecciona el mensaje que crees que es un intento de phishing:</p>
        
        <div className="space-y-3 mb-6">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedId(message.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300
                ${selectedId === message.id 
                  ? 'border-[#9046CF] bg-[#F8E8F4] ring-2 ring-[#CC59D2]/30' 
                  : 'border-[#E8D4F0] bg-white hover:border-[#CC59D2] hover:bg-[#FFFBFA]'
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9046CF] to-[#CC59D2] flex items-center justify-center shrink-0 text-white font-bold">
                  {message.sender.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold ${message.isPhishing ? 'font-mono text-sm' : ''} text-[#2D1B4E]`}>{message.sender}</p>
                  <p className="text-sm text-[#6B4D8A]">
                    {message.preview}
                    {message.link && <span className="font-mono text-xs text-blue-500 underline ml-1">{message.link}</span>}
                  </p>
                </div>
                {selectedId === message.id && (
                  <div className="w-6 h-6 rounded-full bg-[#9046CF] flex items-center justify-center text-white shrink-0">
                    ✓
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={checkAnswer}
          disabled={selectedId === null}
          className="w-full bg-gradient-to-r from-[#9046CF] to-[#CC59D2] hover:from-[#7D3BB8] hover:to-[#B84DC0] text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar selección
        </button>
        {selectedId === null && (
          <p className="text-center text-sm text-[#6B4D8A] mt-2">Selecciona un mensaje para continuar</p>
        )}
      </div>
    </div>
  )
}
