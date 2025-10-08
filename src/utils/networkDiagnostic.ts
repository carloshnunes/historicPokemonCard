// Diagnóstico de rede e performance
export async function diagnoseNetworkIssues() {
  const tests = [
    {
      name: 'Teste de Conectividade Básica',
      test: async () => {
        const startTime = Date.now()
        const response = await fetch('https://httpbin.org/get')
        const endTime = Date.now()
        return {
          success: response.ok,
          duration: endTime - startTime,
          status: response.status,
          details: 'Teste básico de conectividade'
        }
      }
    },
    {
      name: 'Teste DNS Resolution',
      test: async () => {
        const startTime = Date.now()
        try {
          const response = await fetch('https://api.pokemontcg.io/v2/sets?pageSize=1', {
            headers: { 'X-Api-Key': 'c2a8a24b-0d4f-4afd-b985-4a91788092bc' }
          })
          const endTime = Date.now()
          return {
            success: response.ok,
            duration: endTime - startTime,
            status: response.status,
            details: 'Resolução DNS + conexão inicial'
          }
        } catch (error) {
          return {
            success: false,
            duration: 0,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            details: 'Falha na resolução DNS'
          }
        }
      }
    },
    {
      name: 'Teste com Dados Mínimos',
      test: async () => {
        const startTime = Date.now()
        try {
          const response = await fetch('https://api.pokemontcg.io/v2/sets?pageSize=1', {
            headers: { 'X-Api-Key': 'c2a8a24b-0d4f-4afd-b985-4a91788092bc' }
          })
          const data = await response.json()
          const endTime = Date.now()
          return {
            success: response.ok,
            duration: endTime - startTime,
            status: response.status,
            dataSize: JSON.stringify(data).length,
            details: `Dados mínimos: ${data.data?.length || 0} sets`
          }
        } catch (error) {
          return {
            success: false,
            duration: 0,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            details: 'Falha no teste mínimo'
          }
        }
      }
    },
    {
      name: 'Teste de Cache do Navegador',
      test: async () => {
        const startTime = Date.now()
        try {
          // Primeira requisição (sem cache)
          const response1 = await fetch('https://api.pokemontcg.io/v2/sets?pageSize=1', {
            headers: { 'X-Api-Key': 'c2a8a24b-0d4f-4afd-b985-4a91788092bc' }
          })
          const data1 = await response1.json()
          const midTime = Date.now()
          
          // Segunda requisição (com cache)
          const response2 = await fetch('https://api.pokemontcg.io/v2/sets?pageSize=1', {
            headers: { 'X-Api-Key': 'c2a8a24b-0d4f-4afd-b985-4a91788092bc' }
          })
          const data2 = await response2.json()
          const endTime = Date.now()
          
          return {
            success: response1.ok && response2.ok,
            duration: endTime - startTime,
            firstRequest: midTime - startTime,
            secondRequest: endTime - midTime,
            status: response1.status,
            details: 'Teste de cache: primeira vs segunda requisição'
          }
        } catch (error) {
          return {
            success: false,
            duration: 0,
            error: error instanceof Error ? error.message : 'Erro desconhecido',
            details: 'Falha no teste de cache'
          }
        }
      }
    },
    {
      name: 'Teste de Proxy vs Direto',
      test: async () => {
        const results = []
        
        // Teste direto
        try {
          const startTime = Date.now()
          const response = await fetch('https://api.pokemontcg.io/v2/sets?pageSize=1', {
            headers: { 'X-Api-Key': 'c2a8a24b-0d4f-4afd-b985-4a91788092bc' }
          })
          const endTime = Date.now()
          results.push({
            method: 'Direto',
            success: response.ok,
            duration: endTime - startTime,
            status: response.status
          })
        } catch (error) {
          results.push({
            method: 'Direto',
            success: false,
            duration: 0,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          })
        }
        
        // Teste via proxy
        try {
          const startTime = Date.now()
          const response = await fetch('/api/pokemon/sets?pageSize=1')
          const endTime = Date.now()
          results.push({
            method: 'Proxy',
            success: response.ok,
            duration: endTime - startTime,
            status: response.status
          })
        } catch (error) {
          results.push({
            method: 'Proxy',
            success: false,
            duration: 0,
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          })
        }
        
        return {
          success: results.some(r => r.success),
          results: results,
          details: 'Comparação direto vs proxy'
        }
      }
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      const result = await test.test()
      results.push({
        name: test.name,
        ...result
      })
    } catch (error) {
      results.push({
        name: test.name,
        success: false,
        duration: 0,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        details: 'Falha no teste'
      })
    }
  }
  
  return results
}

// Função para executar diagnóstico completo
export async function runNetworkDiagnostic() {
  console.log('🔍 Iniciando diagnóstico de rede...')
  
  const results = await diagnoseNetworkIssues()
  
  console.log('\n🔍 RESULTADOS DO DIAGNÓSTICO:')
  console.log('=' .repeat(60))
  
  results.forEach((result, index) => {
    const emoji = result.success ? '✅' : '❌'
    const speed = result.duration < 1000 ? '⚡' : result.duration < 3000 ? '🐌' : '🐢'
    
    console.log(`${index + 1}. ${emoji} ${result.name}`)
    console.log(`   ${speed} Tempo: ${result.duration}ms`)
    
    if (result.success) {
      if (result.status) console.log(`   📡 Status: ${result.status}`)
      if (result.dataSize) console.log(`   📦 Tamanho: ${result.dataSize} bytes`)
      if (result.firstRequest) console.log(`   🔄 Primeira: ${result.firstRequest}ms`)
      if (result.secondRequest) console.log(`   🔄 Segunda: ${result.secondRequest}ms`)
      if (result.results) {
        result.results.forEach((r: any) => {
          console.log(`   📊 ${r.method}: ${r.success ? '✅' : '❌'} ${r.duration}ms`)
        })
      }
    } else {
      console.log(`   ❌ Erro: ${result.error}`)
    }
    
    console.log(`   📝 ${result.details}`)
    console.log('')
  })
  
  // Análise dos resultados
  const successfulTests = results.filter(r => r.success)
  const avgDuration = successfulTests.reduce((sum, r) => sum + r.duration, 0) / successfulTests.length
  
  console.log('📊 ANÁLISE:')
  console.log(`✅ Testes bem-sucedidos: ${successfulTests.length}/${results.length}`)
  console.log(`⏱️ Tempo médio: ${avgDuration.toFixed(0)}ms`)
  
  if (avgDuration > 5000) {
    console.log('🐌 PROBLEMA: Rede muito lenta! Possíveis causas:')
    console.log('   - Conexão de internet lenta')
    console.log('   - DNS lento')
    console.log('   - Firewall/proxy corporativo')
    console.log('   - Problemas de roteamento')
  } else if (avgDuration > 2000) {
    console.log('⚠️ ATENÇÃO: Rede moderadamente lenta')
  } else {
    console.log('⚡ EXCELENTE: Rede rápida!')
  }
  
  return results
}
