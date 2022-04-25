<template>
  <div class="home">
    <select name="type selector" v-model="selectedType">
      <option v-for="type in availableTypes" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>

    <div class="amount" v-if="totalAmountOfData">
      {{`Displayed ${tableData.length} / ${totalAmountOfData}`}}
    </div>

    <template v-if="selectedType">
     <el-table
      :data="tableData">
      <el-table-column
        :prop="selectedType"
        :label="selectedType"
        width="350">
      </el-table-column>
      <el-table-column
        prop="average_age"
        label="age"
        width="180">
      </el-table-column>
      <el-table-column
        prop="count"
        label="Count"
        width="180">
      </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import types from '@/helpers/types';
import axios from 'axios';

export default {
  name: 'HomeView',

  data() {
    return {
      selectedType: null,
      availableTypes: types.availableTypes,
      fetchedData: {},
      tableData: [],
      totalAmountOfData: null,
    };
  },

  computed: {
  },

  watch: {
    selectedType: {
      handler(val) {
        if (!this.fetchedData[val]) {
          this.retrieveData(val);
        }
        this.setTableData(val);
      },
    },
  },

  methods: {
    retrieveData(type) {
      axios.get(`http://localhost:3000/census?type=${type}`).then((response) => {
        if (response.status === 200) {
          this.fetchedData[type] = response.data.data;
        }
      }).then(() => {
        this.setTableData(type);
      });
    },

    setTableData(type) {
      const data = this.fetchedData[type];
      this.totalAmountOfData = data?.length;
      if (data && data.length > 100) data.length = 100;
      this.tableData = data;
    },
  },
};
</script>

<style scoped>
.el-table {
  max-width: 60%;
  margin: auto;
}
.amount {
  color: cadetblue;
  font-weight: bold;
  margin: 10px 0;
}
</style>
