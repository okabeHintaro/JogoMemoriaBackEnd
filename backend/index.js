import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(express.json())

// Caminho do arquivo de ranking
const rankingFilePath = path.resolve('ranking.json')

// Função para carregar o ranking do arquivo
function loadRanking() {
    try {
        const data = fs.readFileSync(rankingFilePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return []  // Retorna um array vazio se o arquivo não existir ou estiver vazio
    }
}

// Função para salvar o ranking no arquivo
function saveRanking(ranking) {
    fs.writeFileSync(rankingFilePath, JSON.stringify(ranking, null, 2))
}

// Carrega o ranking ao iniciar o servidor
let ranking = loadRanking()

app.post("/list", (req, res) => {
    const { nome, personagem, tempo } = req.body
    ranking.push({ nome, personagem, tempo })
    saveRanking(ranking)  // Salva o ranking atualizado no arquivo
    res.status(200).send('enviado')
})

app.get("/list", (req, res) => {
    res.status(200).send(ranking)
})

app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000')
})
