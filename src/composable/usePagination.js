import { computed } from 'vue'

export default function usePagination(data) {
  const links = computed(() => {
    if (!data.value) {
      return null
    }

    const meta = data.value.meta
    const leftSide = meta.links.slice(0, 3)
    const rightSide = meta.links.slice(-3)
    const pagination = [...leftSide, ...rightSide].reduce((acc, item) => {
      if (!acc.find((el) => el.label === item.label)) {
        acc.push(item)
      }
      return acc
    }, [])

    if (pagination.length < meta.links.length) {
      pagination.splice(3, 0, {
        url: null,
        label: '...',
        active: false,
      })
    }

    return pagination
  })

  return { links }
}
