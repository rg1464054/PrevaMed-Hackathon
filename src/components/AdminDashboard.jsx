import React, { useEffect, useRef, useState } from 'react'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import Papa from 'papaparse'
import JSZip from 'jszip'

import { Stethoscope, Database, DownloadCloud } from 'lucide-react'

const diseases = [
  'Asthma',
  'Cancer',
  'Diabetes',
  'Hypertension',
  'Chronic Kidney Disease',
]

export default function DiseaseEditor() {
  const tableRefs = useRef({})
  const [tables, setTables] = useState({})
  const [loadedDiseases, setLoadedDiseases] = useState({})
  const [columnToDelete, setColumnToDelete] = useState('')

  const initTable = (diseaseName, data) => {
    if (!data || data.length === 0) {
      console.warn(`No data for ${diseaseName}`)
      return
    }

    const columns = [
      {
        formatter: 'rowSelection',
        titleFormatter: 'rowSelection',
        hozAlign: 'center',
        headerSort: false,
        width: 40,
      },
      ...Object.keys(data[0]).map((col) => ({
        title: col,
        field: col,
        editor: 'input',
      })),
    ]

    if (tables[diseaseName]) {
      tables[diseaseName].destroy()
    }

    const newTable = new Tabulator(tableRefs.current[diseaseName], {
      data: data,
      columns: columns,
      layout: 'fitDataTable',
      height: '300px',
      placeholder: 'No Data Available',
      selectable: true, // ✅ enables row selection with checkboxes
      cellEdited: function () {
        const updatedData = newTable.getData()
        localStorage.setItem(`data-${diseaseName}`, JSON.stringify(updatedData))
      },
    })

    setTables((prev) => ({ ...prev, [diseaseName]: newTable }))
    setLoadedDiseases((prev) => ({ ...prev, [diseaseName]: true }))
  }

  useEffect(() => {
    diseases.forEach((disease) => {
      const saved = localStorage.getItem(`data-${disease}`)
      if (saved) {
        initTable(disease, JSON.parse(saved))
      } else {
        fetch(`/default-data/${disease}.csv`)
          .then((res) => res.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true,
              skipEmptyLines: true,
              dynamicTyping: true,
              complete: (results) => {
                initTable(disease, results.data)
              },
              error: (error) => {
                console.error(`Error parsing default ${disease}.csv`, error)
              },
            })
          })
          .catch((err) => console.error(`Error fetching ${disease}.csv`, err))
      }
    })
  }, [])

  const handleFileUpload = (event, diseaseName) => {
    const file = event.target.files[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (results) {
        const data = results.data
        if (!data || data.length === 0) {
          alert(`No data found in ${diseaseName} file`)
          return
        }
        initTable(diseaseName, data)
      },
      error: function (error) {
        alert(`Error parsing ${diseaseName}: ${error}`)
      },
    })
  }

  const addRow = (diseaseName) => {
    const table = tables[diseaseName]
    if (table) {
      table.addRow({})
    }
  }

  const addColumn = (diseaseName) => {
    const table = tables[diseaseName]
    if (table) {
      const newField = `NewField_${Date.now()}`
      table.addColumn(
        { title: newField, field: newField, editor: 'input' },
        true,
        'col'
      )
    }
  }

  const deleteSelectedRows = (diseaseName) => {
    const table = tables[diseaseName]
    if (table) {
      const selected = table.getSelectedRows()
      if (selected.length === 0) {
        alert(`No rows selected for ${diseaseName}.`)
        return
      }
      selected.forEach((row) => row.delete())
    }
  }

  const deleteSpecifiedColumn = (diseaseName) => {
    const table = tables[diseaseName]
    if (table && columnToDelete.trim()) {
      const columns = table.getColumns()
      const target = columns.find(
        (col) => col.getField() === columnToDelete.trim()
      )
      if (target) {
        table.deleteColumn(target)
        alert(`Deleted column "${columnToDelete.trim()}" from ${diseaseName}.`)
      } else {
        alert(`Column "${columnToDelete.trim()}" not found in ${diseaseName}.`)
      }
    } else {
      alert(`Please enter a valid column name to delete.`)
    }
  }

  const createButton = (label, onClick) => (
    <button
      onClick={onClick}
      className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded mr-2 mb-2 transition duration-200"
    >
      {label}
    </button>
  )

  const renderControlButtons = (diseaseName) => (
    <div className="flex flex-wrap gap-2 mt-4 items-center">
      {createButton(`Export ${diseaseName} CSV 📄`, () =>
        tables[diseaseName]?.download('csv', `${diseaseName}_edited.csv`)
      )}
      {createButton(`Export ${diseaseName} JSON 📊`, () =>
        tables[diseaseName]?.download('json', `${diseaseName}_edited.json`)
      )}
      {createButton(`Save ${diseaseName} 💾`, () => {
        const data = tables[diseaseName]?.getData()
        localStorage.setItem(`data-${diseaseName}`, JSON.stringify(data))
        alert(`${diseaseName} data saved to local storage.`)
      })}
      {createButton(`Add Row ➕`, () => addRow(diseaseName))}
      {createButton(`Add Column ➕`, () => addColumn(diseaseName))}
      {createButton(`Delete Selected Rows 🗑️`, () =>
        deleteSelectedRows(diseaseName)
      )}

      <input
        type="text"
        placeholder="Column name..."
        value={columnToDelete}
        onChange={(e) => setColumnToDelete(e.target.value)}
        className="text-black px-2 py-1 rounded border border-gray-400 mr-2 mb-2"
      />

      {createButton(`Delete Specified Column 🗑️`, () =>
        deleteSpecifiedColumn(diseaseName)
      )}

      {createButton(`Clear ${diseaseName} 🗑️`, () => {
        if (
          window.confirm(`Are you sure you want to clear ${diseaseName} table?`)
        ) {
          tables[diseaseName]?.clearData()
          localStorage.removeItem(`data-${diseaseName}`)
          alert(`${diseaseName} table cleared.`)
        }
      })}
    </div>
  )

  const downloadAll = async () => {
    const zip = new JSZip()
    for (const disease of diseases) {
      if (tables[disease]) {
        const data = tables[disease].getData()
        const csv = Papa.unparse(data)
        zip.file(`${disease}_edited.csv`, csv)
      }
    }
    const content = await zip.generateAsync({ type: 'blob' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(content)
    a.download = 'All_Datasets.zip'
    a.click()
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-10 text-center shadow-lg flex items-center justify-center gap-4">
        <Stethoscope size={40} />
        <h1 className="text-4xl font-bold">
          Disease Dataset Editor – Admin Panel
        </h1>
      </header>

      <div className="text-center my-8">
        <button
          className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg text-lg shadow inline-flex items-center gap-2 transition duration-200"
          onClick={downloadAll}
        >
          <DownloadCloud size={22} /> Download All Datasets (ZIP)
        </button>
      </div>

      {diseases.map((disease) => (
        <div
          key={disease}
          className="bg-blue-900 bg-opacity-40 shadow-lg rounded-lg p-6 max-w-5xl mx-auto mb-8 border border-blue-700"
        >
          <h2 className="text-2xl font-semibold text-blue-200 border-b border-blue-400 pb-2 mb-4 flex items-center gap-2">
            <Database size={22} /> {disease}
          </h2>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => handleFileUpload(e, disease)}
            className="mb-4 block text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-900"
          />

          <div className="w-full overflow-x-auto">
            <div
              ref={(el) => (tableRefs.current[disease] = el)}
              className="min-w-[1200px] border border-blue-700 rounded bg-white"
            ></div>
          </div>

          {loadedDiseases[disease] && renderControlButtons(disease)}
        </div>
      ))}
    </div>
  )
}
