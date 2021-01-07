<template>
  <tr>
    <td><slot name="label"></slot></td>
    <td><slot name="content"></slot></td>
  </tr>
</template>
<script>
export default {
  name: "zq-table-column",
};
</script>