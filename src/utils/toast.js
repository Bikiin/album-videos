
export function createToast(message, type, toast) {
  const notif = document.createElement('div')
  notif.classList.add('toast')
  notif.classList.add(type)

  notif.innerText = message
  toast.appendChild(notif)

  setTimeout(() => {
    notif.remove()
  }, 3000)
}