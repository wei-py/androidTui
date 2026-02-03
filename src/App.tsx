import { Box, Newline, Text } from "ink"
import * as React from "react"
import { useState } from "react"
import * as z from "zod"

// 定义应用状态的Zod schema
type AppState = z.infer<typeof _AppStateSchema>
const _AppStateSchema = z.object({
  count: z.number(),
})

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    count: 0,
  })

  const _handleIncrement = () => {
    setState(prevState => ({
      ...prevState,
      count: prevState.count + 1,
    }))
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text bold color="cyan">Android Terminal UI</Text>
        <Newline />
        <Text dimColor>Manage your Android devices from terminal</Text>
      </Box>

      <Box marginTop={1}>
        <Text>Current count: </Text>
        <Text bold color="green">{state.count}</Text>
      </Box>

      <Box marginTop={1}>
        <Text color="gray">Press any key to increment (simulated)</Text>
      </Box>

      <Box marginTop={1}>
        <Text color="blue">Welcome to Android Terminal UI!</Text>
      </Box>
    </Box>
  )
}

export default App
