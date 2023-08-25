'use client'

import React, { useState, useEffect } from 'react';
import { Datablock } from '../../utils/data/types';
import API from '@/utils/api/api';
import { EyeIcon, ArrowPathIcon } from '@heroicons/react/20/solid';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';


const DatablockList: React.FC = () => {
  const [datablocks, setDatablocks] = useState<Datablock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedDatablocks, setExpandedDatablocks] = useState<Set<string>>(new Set());
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

  useEffect(() => {
    getFormDatablocks()
  }, [])

  const getFormDatablocks = async () => {
      const formDatablocks = await API.getFormDatablocks();
      setDatablocks(formDatablocks.data);
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

  const toggleExpand = (blockId: string) => { // Updated the type here
    const updatedExpandedBlocks = new Set(expandedDatablocks);
    if (updatedExpandedBlocks.has(blockId)) {
      updatedExpandedBlocks.delete(blockId);
    } else {
      updatedExpandedBlocks.add(blockId);
    }
    setExpandedDatablocks(updatedExpandedBlocks);
  };

  const handlePreview = (blockId: string) => {
    if (selectedPreview === blockId) {
      setSelectedPreview(null); // Hide the preview if clicked again
    } else {
      setSelectedPreview(blockId); // Show the preview for the clicked datablock
    }
  };

  const selectedDatablock = datablocks.find(db => db._id === selectedPreview);

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
            <div className="flex items-center justify-between" onClick={() => handlePreview(block._id)}>
              <div className="flex items-center">
                <EyeIcon
                  className={`w-5 h-5 mr-2 ${selectedPreview === block._id ? 'text-green-500' : 'text-gray-400'}`}
                />
                <span>{block.name}</span>
              </div>
              
              <span onClick={(e) => {e.stopPropagation(); toggleExpand(block._id);}}>
                {expandedDatablocks.has(block._id) ? '▲' : '▼'}
              </span>
            </div>

            {expandedDatablocks.has(block._id) && (
              <div className="mt-2 text-gray-600">
                {block.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Datablock Preview */}
      <div className="flex-1">
        {selectedDatablock && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedDatablock.name}</h2>
                <ArrowPathIcon className="w-5 h-5 cursor-pointer" onClick={handleRefresh} />
              </div>
              {renderSurveyPreview()}
            </div>
          )}
      </div>
    </div>
  );
}

export default DatablockList;

