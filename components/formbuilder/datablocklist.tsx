'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Datablock } from '../../utils/data/types';
import API from '@/utils/api/api';
import { EyeIcon, ArrowPathIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';

export interface DatablockListProps {
  organisationId: string;
  formId: string;
}

const DatablockList = ({organisationId, formId}: DatablockListProps) => {
  const [datablocks, setDatablocks] = useState<Datablock[]>([]);
  const [datablocksForm, setDatablocksForm] = useState<Datablock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [expandedDatablocks, setExpandedDatablocks] = useState<Set<string>>(new Set());
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

  useEffect(() => {
    getFormDatablocks();
    getDatablockFromForm();
  }, [])

  const getFormDatablocks = async () => {
    const formDatablocks = await API.getFormDatablocks();
    setDatablocks(formDatablocks.data);
  }

  const getDatablockFromForm = async () => {
    const formDatablocksForm = await API.getDatablockFromForm(organisationId, formId);
    setDatablocksForm(formDatablocksForm.data);
  }

  const handleRefresh = () => {
    setRefreshToggle(prev => !prev);
  };

  const filteredDatablocks = datablocks.filter(block => 
    block.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSurveyPreview = () => {
    if (selectedDatablock && selectedDatablock.datablock) {
      const surveyTemplate = {
        "pages": [
          {
            "elements": [selectedDatablock.datablock]
          }
        ]
      };

      const survey = new Model(surveyTemplate); 
      return <Survey model={survey} />;
    }
    return null;
  };

  // const toggleExpand = (blockId: string) => { // Updated the type here
  //   const updatedExpandedBlocks = new Set(expandedDatablocks);
  //   if (updatedExpandedBlocks.has(blockId)) {
  //     updatedExpandedBlocks.delete(blockId);
  //   } else {
  //     updatedExpandedBlocks.add(blockId);
  //   }
  //   setExpandedDatablocks(updatedExpandedBlocks);
  // };

  const handlePreview = useCallback((blockId: string) => () => {
    if (selectedPreview === blockId) {
      setSelectedPreview(null); // Hide the preview if clicked again
    } else {
      setSelectedPreview(blockId); // Show the preview for the clicked datablock
    }
  }, []);

  const selectedDatablock = datablocks.find(db => db._id === selectedPreview);

  const addDatablockFromForm = useCallback((organisaionId: string, formId: string, block: Datablock) => () => {
    API.addDatablockFromForm(organisaionId, formId, block)
    .then(response => {
      if(response.status === 200) {
        getDatablockFromForm()
      }
    }
    )
    .catch(error => console.log("Error while adding datablock", error))
  }, [])

  const removeDatablockFromForm = useCallback((organisaionId: string, formId: string, block: Datablock) => () => {
    API.removeDatablockFromForm(organisaionId, formId, block)
    .then(response => {
      if(response.status === 200) {
        getDatablockFromForm()
      }
    }
    )
    .catch(error => console.log("Error while removing datablock", error))
  }, [])

  
function isObjectEqual(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function isElementInArray<T>(element: T, Array: T[]): boolean {
  for (const item of Array) {
    //@ts-ignore
    if (isObjectEqual(item, element)) {
      return true;
    }
  }
  return false;
}

  return (
    <div className="flex space-x-4 w-full">
      {/* Datablock List */}
      <div className="flex-1 space-y-4">
        <input
          type="text"
          placeholder="Search datablocks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />

        {filteredDatablocks.map(block => (
          <div key={block._id} className="border rounded p-2 hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <EyeIcon
                  className={`w-5 h-5 mr-2 ${selectedPreview === block._id ? 'text-green-500' : 'text-gray-400'}`}
                   onClick={handlePreview(block._id)}
                />
                <span>{block.name}</span>
              </div>
              
              {/* <span onClick={(e) => {e.stopPropagation(); toggleExpand(block._id);}}>
                {expandedDatablocks.has(block._id) ? '▲' : '▼'}
              </span> */}
              {isElementInArray(block, datablocksForm) ?
                <MinusIcon className='w-5 h-5 ml-2' onClick={removeDatablockFromForm(organisationId, formId, block)} />
                : <PlusIcon className='w-5 h-5 ml-2' onClick={addDatablockFromForm(organisationId, formId, block)} />
              }
            </div>

            {/* {expandedDatablocks.has(block._id) && (
              <div className="mt-2 text-gray-600">
                {block.description}
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Datablock Preview */}
      <div className="flex-1">
        {selectedDatablock && (
            <div>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-bold">{selectedDatablock.name}</h2>
                <ArrowPathIcon className="w-5 h-5 cursor-pointer" onClick={handleRefresh} />
              </div>
              <div className="p-4 text-gray-600">
                {selectedDatablock.description}
              </div>
              {renderSurveyPreview()}
            </div>
          )}
      </div>
    </div>
  );
}

export default DatablockList;

