import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlocks } from "../store/blockSlice";

const Block = () => {
  const dispatch = useDispatch();
  const { blocks, loading, error } = useSelector((state) => state.blocks);

  useEffect(() => {
    dispatch(fetchBlocks());
  }, [dispatch]);

  if (loading) return <p>Loading blocks...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ✅ Helper function to shorten hashes
  const shortenHash = (hash) => {
    if (!hash) return "N/A";
    return hash.slice(0, 4) + "..."; // first 4 chars only
  };

  return (
    <div className="blocks-container">
      <h2 className="blocks-heading">⛓ Blockchain Blocks</h2>

      {blocks.length === 0 ? (
        <p className="no-blocks">No blocks found</p>
      ) : (
        <div className="block-chain">
          {blocks.map((block, index) => (
            <div key={block.block_id} className="block-wrapper">
              <div className="block-card">
                <p><strong>ID:</strong> {block.block_id}</p>
                <p><strong>Block Hash:</strong> {shortenHash(block.block_hash)}</p>
                <p><strong>Previous Hash:</strong> {shortenHash(block.previous_hash)}</p>
                <p><strong>Timestamp:</strong> {block.timestamp}</p>
              </div>

              {/* show arrow except for last block */}
              {index < blocks.length - 1 && (
                <div className="chain-link">➤</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Block;
