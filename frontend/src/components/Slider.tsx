const BusCardLoader = () => {
    const shimmerStyle = {
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.2s infinite',
      borderRadius: '8px',
    };
  
    const styles = {
      wrapper: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      },
      leftImage: {
        width: '80px',
        height: '60px',
        ...shimmerStyle,
      },
      content: {
        flex: 1,
      },
      line: (width: string, height = '16px') => ({
        width,
        height,
        marginBottom: '10px',
        ...shimmerStyle,
      }),
    };
  
    return (
      <>
        <style>
          {`@keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
          }`}
        </style>
  
        <div style={styles.wrapper}>
          <div style={styles.leftImage} />
          <div style={styles.content}>
            <div style={styles.line('40%')} />
            <div style={styles.line('60%')} />
            <div style={styles.line('30%')} />
          </div>
          <div>
            <div style={styles.line('80px', '30px')} />
          </div>
        </div>
      </>
    );
  };
  
  export default BusCardLoader;
  