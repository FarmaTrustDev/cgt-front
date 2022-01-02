<template>
 
    <a-list item-layout="horizontal" :data-source="data" :bordered="false">
      <a-list-item slot="renderItem" slot-scope="">
        <a-list-item-meta description="your recent message">
          <a slot="title" href="https://www.antdv.com/">User name</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>

</template>
<script>
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]
export default {
  data() {
    return {
      data,
    }
  },
}
</script>
