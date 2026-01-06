import React, { createContext, useContext, useState, useMemo } from 'react'

const Ctx = createContext({ extras: null, setExtras: () => {} })

export function AppBarExtrasProvider({ children }) {
  const [extras, setExtras] = useState(null)
  const value = useMemo(() => ({ extras, setExtras }), [extras])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAppBarExtras = () => useContext(Ctx)
