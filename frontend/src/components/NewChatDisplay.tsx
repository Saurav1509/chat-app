export function NewChatDisplay({ newChat }: any) {

  return <ul>
    {newChat.map((item: string) => <li>{item}</li>)}
  </ul>
}
